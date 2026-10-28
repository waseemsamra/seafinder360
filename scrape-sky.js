const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.skywalker.ae/yacht-rental-dubai/', { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForTimeout(10000);
  
  const data = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('a').forEach(a => {
      if (a.href && a.innerText && a.innerText.length > 10) {
        const t = a.innerText;
        if (t.includes('Yacht') || t.includes('ft') || t.match(/[0-9]+/)) {
          items.push({ href: a.href, text: t.substring(0, 200) });
        }
      }
    });
    return items;
  });
  
  fs.writeFileSync('/tmp/sky.json', JSON.stringify(data, null, 2));
  console.log(data.length);
  await browser.close();
})();
