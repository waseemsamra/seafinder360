const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.yachtrentaldubai.com/all-yachts', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(20000);
  
  // Scroll aggressively
  for (let i = 0; i < 15; i++) {
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(2000);
  }
  
  const html = await page.content();
  fs.writeFileSync('/tmp/yrd-page.html', html);
  
  // Extract all links
  const links = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a'));
    return a.filter(x => x.href && x.href.includes('yacht') && !x.href.includes('#')).map(x => x.href);
  });
  
  console.log('links:', links.length);
  console.log([...new Set(links)].slice(0, 20));
  
  await browser.close();
})();
