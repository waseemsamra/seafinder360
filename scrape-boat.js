const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Intercept network requests
  const apiResponses = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('supabase') || url.includes('api') || url.includes('boat') || url.includes('yacht') || url.includes('listing')) {
      try {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('json')) {
          const json = await response.json();
          apiResponses.push({ url, json });
        }
      } catch(e) {}
    }
  });
  
  await page.goto('https://boatfinderplus.com/rent/yacht-for-rent', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Also try to get data from window
  const data = await page.evaluate(() => {
    const results = {};
    for (let key in window) {
      if (key.includes('DATA') || key.includes('STATE') || key.includes('PROPS') || key.includes('__')) {
        try {
          if (typeof window[key] === 'object' && window[key] !== null) {
            results[key] = window[key];
          }
        } catch(e) {}
      }
    }
    return results;
  });
  
  fs.writeFileSync('/tmp/boat-api.json', JSON.stringify({ apiResponses, windowData: data }, null, 2));
  console.log('saved, api calls:', apiResponses.length);
  
  await browser.close();
})();
