const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const apiData = {};
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('lpzuuqmcscicxduexwqw.supabase.co/rest/v1/')) {
      try {
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('json')) {
          const json = await response.json();
          const key = url.split('/rest/v1/')[1].split('?')[0];
          if (!apiData[key]) apiData[key] = [];
          if (Array.isArray(json)) apiData[key] = apiData[key].concat(json);
          else apiData[key].push(json);
        }
      } catch(e) {}
    }
  });
  
  console.log('Loading page...');
  await page.goto('https://boatfinderplus.com/rent/yacht-for-rent', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(10000);
  
  // Scroll to load all
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
  }
  
  fs.writeFileSync('/tmp/boat-full.json', JSON.stringify(apiData, null, 2));
  console.log('Done. Keys:', Object.keys(apiData));
  console.log('Listings:', apiData.listings?.length || 0);
  console.log('Images:', apiData.listing_images?.length || 0);
  
  await browser.close();
})();
