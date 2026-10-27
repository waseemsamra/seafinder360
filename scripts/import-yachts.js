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
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'image/*,*/*' }, timeout: 30000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
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
  
  console.log(`Found ${lines.length} yachts`);
  
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
    
    console.log(`\n[${trackSeq}] ${name} - ${imageUrls.length} images`);
    
    const uploadedImages = [];
    for (let imgIdx = 0; imgIdx < imageUrls.length; imgIdx++) {
      try {
        const imgUrl = imageUrls[imgIdx];
        const urlPath = imgUrl.split('?')[0];
        let ext = urlPath.split('.').pop().toLowerCase();
        if (ext.length > 4 || !['jpg','jpeg','png','webp','gif','avif'].includes(ext)) ext = 'jpg';
        const fileName = `yacht_${trackSeq}_${String(imgIdx + 1).padStart(2, '0')}.${ext}`;
        console.log(`  Downloading ${imgIdx + 1}...`);
        const buffer = await downloadImage(imgUrl);
        console.log(`  Uploading ${fileName} (${buffer.length} bytes)...`);
        const result = await imagekit.upload({
          file: buffer,
          fileName: fileName,
          useUniqueFileName: false,
        });
        uploadedImages.push(result.url);
        console.log(`  OK: ${result.url}`);
      } catch (e) {
        console.log(`  ERR: ${e.message}`);
      }
      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    }
    
    const priceNum = parseInt((String(price).match(/\d+/) || ['0'])[0]) || price;
    
    const yachtData = {
      name: name,
      price: priceNum,
      length: length,
      capacity: capacity,
      crew: crew,
      rooms: rooms,
      location: location,
      images: uploadedImages,
      description: `${name} luxury yacht charter in Dubai Marina. ${length} | ${capacity} | ${crew} | ${rooms}.`,
      features: { length, capacity, crew, rooms, location },
      status: 'active',
      category: 'Luxury Yacht'
    };
    
    const { error } = await supabase.from('yachts').insert(yachtData);
    if (error) {
      console.log(`  DB ERR: ${error.message}`);
    } else {
      console.log(`  DB: Inserted ${name} with ${uploadedImages.length} images`);
    }
  }
  
  console.log('\n=== DONE ===');
  process.exit(0);
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
