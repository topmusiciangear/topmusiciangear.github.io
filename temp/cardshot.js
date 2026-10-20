// Uso: node temp/cardshot.js <url> <prefix> [n] [width]
// Captura las primeras n cards con screenshot de viewport (fiable, sin stitching).
const { chromium } = require('playwright');

(async () => {
  const [url, prefix, n, w] = process.argv.slice(2);
  const count = parseInt(n || '4', 10);
  const width = parseInt(w || '1400', 10);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 1100 }, deviceScaleFactor: 1 });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.addStyleTag({ content: 'iframe,[id*="float"],[class*="float"],[class*="sticky-video"],[id*="sticky"]{display:none!important}' });
  await page.waitForTimeout(1500);

  const cards = await page.$$('.guide-product-card');
  console.log('cards: ' + cards.length);
  for (let i = 0; i < Math.min(count, cards.length); i++) {
    await cards[i].evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(300);
    const b = await cards[i].boundingBox();
    const y = Math.max(0, b.y);
    await page.screenshot({
      path: prefix + i + '.png',
      clip: { x: Math.max(0, b.x), y, width: b.width, height: Math.min(b.height, 1100 - y) },
    });
  }
  console.log('ok');
  await browser.close();
})();
