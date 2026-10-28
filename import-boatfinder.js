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
  const data = JSON.parse(fs.readFileSync('/tmp/boat-full.json', 'utf8'));
  const listings = data.listings || [];
  const imgs = data.listing_images || [];
  const byImg = {};
  for (const im of imgs) {
    if (!byImg[im.listing_id]) byImg[im.listing_id] = [];
    byImg[im.listing_id].push(im.url);
  }
  
  for (let i = 0; i < listings.length; i++) {
    const l = listings[i];
    const trackSeq = String(50 + i).padStart(3, '0');
    const name = l.title || 'Yacht';
    const imageUrls = byImg[l.id] || [];
    
    console.log(`[${trackSeq}] ${name} - ${imageUrls.length} images`);
    
    const uploadedImages = [];
    for (let k = 0; k < Math.min(imageUrls.length, 20); k++) {
      try {
        const url = imageUrls[k];
        const ext = url.includes('.jpg') ? 'jpg' : url.includes('.png') ? 'png' : url.includes('.webp') ? 'webp' : 'jpg';
        const fileName = `yacht_${trackSeq}_${String(k + 1).padStart(2, '0')}.${ext}`;
        const buffer = await downloadImage(url);
        const result = await imagekit.upload({ file: buffer, fileName: fileName, useUniqueFileName: false });
        uploadedImages.push(result.url);
        if ((k + 1) % 5 === 0) console.log(`  ${k + 1} uploaded`);
      } catch (e) {}
      await new Promise(r => setTimeout(r, 200));
    }
    
    const lenMatch = String(name).match(/(\d+)\s*ft/i);
    const lenFt = lenMatch ? parseFloat(lenMatch[1]) : l.length_m ? l.length_m * 3.28084 : 80;
    const guestsMatch = String(l.description || '').match(/(\d+)\s*(guest|pax)/i);
    const guests = guestsMatch ? parseInt(guestsMatch[1]) : 12;
    
    const yachtData = {
      name: name,
      price: 2500,
      type: 'Motor Yacht',
      guests: guests,
      length: Math.round(lenFt),
      length_ft: Math.round(lenFt),
      cabins: l.cabins || 4,
      location: l.location || 'Dubai Harbour',
      marina: l.location || 'Dubai Harbour',
      img: uploadedImages[0] || null,
      amenities: { gallery: uploadedImages, images: uploadedImages },
      is_f1: false
    };
    
    const { error } = await supabase.from('yachts').insert(yachtData);
    if (error) console.log(`  ERR: ${error.message}`);
    else console.log(`  OK: ${uploadedImages.length} images`);
  }
  
  console.log('\nDONE');
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
