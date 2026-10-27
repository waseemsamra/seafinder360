const fs = require('fs');
const https = require('https');
const http = require('http');
const { createClient } = require('@supabase/supabase-js');
const ImageKit = require('imagekit');

const env = fs.readFileSync('/Users/apple/Downloads/seafinder360/.env.local', 'utf8');
const getEnv = (k) => {
  const m = env.match(new RegExp(k + '=(.*)'));
  return m ? m[1].trim().replace(/\r/g, '') : '';
};

const supabase = createClient(getEnv('NEXT_PUBLIC_SUPABASE_URL'), getEnv('SUPABASE_SERVICE_ROLE_KEY'));
const imagekit = new ImageKit({
  publicKey: getEnv('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY') || getEnv('IMAGEKIT_PUBLIC_KEY'),
  privateKey: getEnv('IMAGEKIT_PRIVATE_KEY'),
  urlEndpoint: getEnv('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT') || getEnv('IMAGEKIT_URL_ENDPOINT'),
});

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const client = url.starts.startsWith ? url.startsWith('https') : false;
    const u = url.startsWith('https') ? https : http;
    const req = u.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function run() {
  const csvPath = '/Users/apple/Downloads/yachts_clean.csv';
  const text = fs.readFileSync(csvPath, 'utf8');
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const parts = [];
    let current = '';
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '"') { inQuotes = !inQuotes; continue; }
      if (line[j] === ',' && !inQuotes) {
        parts.push(current.trim());
        current = '';
      } else {
        current += line[j];
      }
    }
    parts.push(current.trim());
    
    const trackSeq = String(i + 1).padStart(3, '0');
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
    for (let imgIdx = 0; imgIdx < imageUrls.length; imgIdx++) {
      try {
        const imgUrl = imageUrls[imgIdx];
        const urlPath = imgUrl.split('?')[0];
        let ext = urlPath.split('.').pop().toLowerCase();
        if (ext.length > 4 || !['jpg','jpeg','png','webp','gif','avif'].includes(ext)) ext = 'jpg';
        const fileName = `yacht_${trackSeq}_${String(imgIdx + 1).padStart(2, '0')}.${ext}`;
        const buffer = await downloadImage(imgUrl);
        const result = await imagekit.upload({ file: buffer, fileName: fileName, useUniqueFileName: false });
        uploadedImages.push(result.url);
        if ((imgIdx + 1) % 5 === 0) console.log(`  ${imgIdx + 1} uploaded`);
      } catch (e) {
        // skip
      }
      await new Promise(r => setTimeout(r, 200));
    }
    console.log(`  Total: ${uploadedImages.length}`);
    
    const priceNum = parseInt((String(price).match(/\d+/) || ['0'])[0]) || 0;
    const guestsMatch = String(capacity).match(/\d+/);
    const guests = guestsMatch ? parseInt(guestsMatch[0]) : 10;
    const lengthMatch = String(length).match(/[\d.]+/);
    const lengthFt = lengthMatch ? parseFloat(lengthMatch[0]) : null;
    const cabinsMatch = String(rooms).match(/\d+/);
    const cabins = cabinsMatch ? parseInt(cabinsMatch[0]) : 1;
    
    const yachtData = {
      name: name,
      price: priceNum,
      type: 'Motor Yacht',
      guests: guests,
      length: lengthFt || 50,
      length_ft: lengthFt,
      cabins: cabins,
      location: location,
      marina: location,
      img: uploadedImages[0] || null,
      amenities: [crew, rooms, capacity].filter(Boolean),
      status: 'active',
      is_f1: false
    };
    
    const { error } = await supabase.from('yachts').insert(yachtData);
    if (error) console.log(`  DB ERR: ${error.message}`);
    else console.log(`  DB OK`);
  }
  console.log('\n=== ALL DONE ===');
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
