const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.skywalker.ae/yacht-rental-dubai/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 15000));
  
  const data = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('a').forEach(a => {
      const href = a.href || '';
      const t = a.innerText || '';
      if (href.includes('skywalker') && t.length > 5) {
        if (t.match(/[0-9]+/) && (t.toLowerCase().includes('yacht') || t.toLowerCase().includes('ft'))) {
          items.push({ href, text: t.substring(0, 150) });
        }
      }
    });
    return [...new Map(items.map(i=>[i.href,i])).values()];
  });
  
  fs.writeFileSync('/tmp/sky.json', JSON.stringify(data, null, 2));
  console.log(data.length);
  data.slice(0,20).forEach(d=>console.log(d.href));
  await browser.close();
})();
