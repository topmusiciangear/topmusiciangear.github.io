// Abre el lightbox de una imagen de card y captura. Uso: node temp/lightbox.js <url> <out.png>
const { chromium } = require('playwright');

(async () => {
  const [url, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 950 }, deviceScaleFactor: 2 });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.addStyleTag({ content: 'iframe,[id*="float"],[class*="float"]{display:none!important}' });
  await page.waitForTimeout(1200);
  const img = await page.$('.guide-product-card-img img');
  await img.evaluate(n => n.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(300);
  await img.click();
  await page.waitForTimeout(900);
  const info = await page.evaluate(() => {
    const lb = document.querySelector('#lightbox');
    if (!lb) return null;
    const im = lb.querySelector('img');
    const cs = im ? getComputedStyle(im) : null;
    return { display: getComputedStyle(lb).display, src: im && im.getAttribute('src'), radius: cs && cs.borderRadius, bg: cs && cs.backgroundColor };
  });
  console.log(JSON.stringify(info));
  await page.screenshot({ path: out });
  console.log('ok');
  await browser.close();
})();
