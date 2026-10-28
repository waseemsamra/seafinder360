const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://elitepearlcharter.com/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(15000);
  
  const yachts = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.href;
      const txt = a.innerText;
      if (href && txt && /[0-9]+/.test(txt) && txt.length < 100) {
        if ((txt.includes('FT') || txt.includes('ft') || txt.toLowerCase().includes('yacht')) && 
            !href.includes('wa.me') && !href.includes('facebook') && !href.includes('instagram')) {
          items.push({ name: txt.replace(/\n/g,' ').replace(/\s+/g,' ').trim(), href });
        }
      }
    });
    return [...new Map(items.map(i=>[i.href,i])).values()];
  });
  
  console.log(yachts.length);
  yachts.forEach(y=>console.log(y.name, '|', y.href));
  fs.writeFileSync('/tmp/elite-all.json', JSON.stringify(yachts, null, 2));
  await browser.close();
})();
