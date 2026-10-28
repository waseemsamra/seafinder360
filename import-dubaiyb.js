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
    const cleanUrl = url.replace(/"/g, '').trim();
    const u = cleanUrl.startsWith('https') ? https : http;
    const req = u.get(cleanUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
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
  const csvPath = '/Users/apple/Downloads/seafinder360/public/dubaiyachtbooking_yachts.csv';
  const text = fs.readFileSync(csvPath, 'utf8');
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  
  for (let i = 1; i < lines.length; i++) {
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
    
    const trackSeq = String(600 + i).padStart(3, '0');
    const category = parts[0] || 'Luxury Yacht';
    const name = parts[1] || category;
    const price = parts[2] || '0';
    const length = parts[3] || '';
    const capacity = parts[4] || '';
    const crew = parts[5] || '';
    const rooms = parts[6] || '';
    const location = parts[7] || 'Dubai';
    const imageUrls = parts.slice(8).filter(u => u && (u.includes('http')));
    
    console.log(`[${trackSeq}] ${name.substring(0,40)} - ${imageUrls.length} images`);
    
    const uploadedImages = [];
    for (let k = 0; k < Math.min(imageUrls.length, 40); k++) {
      try {
        const url = imageUrls[k].replace(/"/g, '').trim();
        if (!url.startsWith('http')) continue;
        const urlPath = url.split('?')[0];
        let ext = urlPath.split('.').pop().toLowerCase();
        if (ext.length > 4 || !['jpg','jpeg','png','webp','gif','avif'].includes(ext)) ext = 'jpg';
        const fileName = `yacht_${trackSeq}_${String(k + 1).padStart(2, '0')}.${ext}`;
        const buffer = await downloadImage(url);
        const result = await imagekit.upload({ file: buffer, fileName: fileName, useUniqueFileName: false });
        uploadedImages.push(result.url);
        if ((k + 1) % 10 === 0) console.log(`  ${k + 1} uploaded`);
      } catch (e) {}
      await new Promise(r => setTimeout(r, 200));
    }
    
    const priceNum = parseInt((String(price).match(/\d+/) || ['0'])[0]) || 0;
    const g = String(capacity).match(/\d+/);
    const guests = g ? parseInt(g[0]) : 12;
    const lm = String(length).match(/[\d.]+/);
    const lenFt = lm ? parseFloat(lm[0]) : 80;
    const cm = String(rooms).match(/\d+/);
    const cabCount = cm ? parseInt(cm[0]) : 4;
    
    const yachtData = {
      name: name,
      price: priceNum,
      type: category,
      guests: guests,
      length: lenFt,
      length_ft: lenFt,
      cabins: cabCount,
      location: location,
      marina: location,
      img: uploadedImages[0] || null,
      amenities: { gallery: uploadedImages, images: uploadedImages, category: category, crew: crew },
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
