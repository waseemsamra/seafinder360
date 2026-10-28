const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://elitepearlcharter.com/our-fleet/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(10000);
  
  const html = await page.content();
  fs.writeFileSync('/tmp/elite.html', html);
  
  const yachts = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('a').forEach(a => {
      const href = a.href;
      const txt = a.innerText;
      if (href && txt && /[0-9]+/.test(txt) && txt.length < 80) {
        if (txt.includes('FT') || txt.includes('ft') || txt.includes('Yacht')) {
          items.push({ name: txt.replace(/\n/g,' '), href });
        }
      }
    });
    return [...new Map(items.map(i=>[i.href,i])).values()];
  });
  
  console.log(yachts.length);
  yachts.forEach(y=>console.log(y.name));
  fs.writeFileSync('/tmp/elite-yachts.json', JSON.stringify(yachts, null, 2));
  await browser.close();
})();
