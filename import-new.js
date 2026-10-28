const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const https = require('https');
const http = require('http');
const ImageKit = require('imagekit');

const env = fs.readFileSync('/Users/apple/Downloads/seafinder360/.env.local', 'utf8');
const getEnv = (k) => { const m = env.match(new RegExp(k + '=(.*)')); return m ? m[1].trim().replace(/\r/g, '') : ''; };

const supabase = createClient(getEnv('NEXT_PUBLIC_SUPABASE_URL'), getEnv('SUPABASE_SERVICE_ROLE_KEY'));
const imagekit = new ImageKit({
  publicKey: getEnv('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY') || getEnv('IMAGEKIT_PUBLIC_KEY'),
  privateKey: getEnv('IMAGEKIT_PRIVATE_KEY'),
  urlEndpoint: getEnv('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT') || getEnv('IMAGEKIT_URL_ENDPOINT'),
});

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const u = url.startsWith('https') ? https : http;
    const req = u.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(res.statusCode));
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('t')); });
  });
}

async function run() {
  const csvPath = '/Users/apple/Downloads/yachts_new.csv';
  const text = fs.readFileSync(csvPath, 'utf8');
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '"') { inQuotes = !inQuotes; continue; }
      if (line[j] === ',' && !inQuotes) { parts.push(current.trim()); current = ''; }
      else current += line[j];
    }
    parts.push(current.trim());
    
    const trackSeq = String(200 + i).padStart(3, '0');
    const name = parts[0];
    const price = parts[1];
    const length = parts[2];
    const capacity = parts[3];
    const crew = parts[4];
    const rooms = parts[5];
    const location = parts[6];
    const imageUrls = parts.slice(7).filter(u => u && (u.startsWith('http://') || u.startsWith('https://')));
    
    console.log(`[${trackSeq}] ${name} - ${imageUrls.length} images`);
    
    const uploadedImages = [];
    for (let k = 0; k < Math.min(imageUrls.length, 25); k++) {
      try {
        const url = imageUrls[k];
        const urlPath = url.split('?')[0];
        let ext = urlPath.split('.').pop().toLowerCase();
        if (ext.length > 4 || !['jpg','jpeg','png','webp','gif','avif'].includes(ext)) ext = 'jpg';
        const fileName = `yacht_${trackSeq}_${String(k + 1).padStart(2, '0')}.${ext}`;
        const buffer = await downloadImage(url);
        const result = await imagekit.upload({ file: buffer, fileName: fileName, useUniqueFileName: false });
        uploadedImages.push(result.url);
        if ((k + 1) % 5 === 0) console.log(`  ${k + 1} uploaded`);
      } catch (e) {}
      await new Promise(r => setTimeout(r, 300));
    }
    
    const priceNum = parseInt((String(price).match(/\d+/) || ['0'])[0]) || 0;
    const g = String(capacity).match(/\d+/);
    const guests = g ? parseInt(g[0]) : 12;
    const lm = String(length).match(/[\d.]+/);
    const lenFt = lm ? parseFloat(lm[0]) : 70;
    const cm = String(rooms).match(/\d+/);
    const cab = cm ? parseInt(cm[0]) : 3;
    
    const yachtData = {
      name: name,
      price: priceNum,
      type: 'Motor Yacht',
      guests: guests,
      length: lenFt,
      length_ft: lenFt,
      cabins: cab,
      location: location || 'Dubai Harbour',
      marina: location || 'Dubai Harbour',
      img: uploadedImages[0] || null,
      amenities: { gallery: uploadedImages, images: uploadedImages, crew: crew, rooms: rooms },
      is_f1: false
    };
    
    const { error } = await supabase.from('yachts').insert(yachtData);
    if (error) console.log(`  ERR: ${error.message}`);
    else console.log(`  OK: ${uploadedImages.length} images`);
  }
  console.log('\nDONE');
  process.exit(0);
}
run();
