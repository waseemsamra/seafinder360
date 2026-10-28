const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const allData = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('wp-json') || url.includes('/api/') || url.includes('rest')) {
      try {
        const ct = response.headers()['content-type'] || '';
        if (ct.includes('json')) {
          const json = await response.json();
          allData.push({ url, json });
        }
      } catch(e) {}
    }
  });
  
  await page.goto('https://www.yachtrentaldubai.com/all-yachts', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(15000);
  
  // Try to scroll and load more
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(3000);
  }
  
  // Also try to extract from page
  const yachts = await page.evaluate(() => {
    const results = [];
    const cards = document.querySelectorAll('[class*="yacht"], [class*="card"], article');
    cards.forEach(card => {
      const text = card.innerText;
      if (text.length > 50) {
        results.push({
          text: text.substring(0, 500),
          html: card.innerHTML.substring(0, 200)
        });
      }
    });
    return results.slice(0, 30);
  });
  
  fs.writeFileSync('/tmp/yrd.json', JSON.stringify({ api: allData, cards: yachts }, null, 2));
  console.log('done', allData.length, yachts.length);
  
  await browser.close();
})();
