// Captura cards de una pagina EN VIVO (sin bloquear externos). Uso: node temp/live_cards.js <url> <prefix> [n]
const { chromium } = require('playwright');

(async () => {
  const [url, prefix, n] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.addStyleTag({ content: 'iframe,[id*="float"],[class*="float"]{display:none!important}' });
  await page.waitForTimeout(4000);
  const cards = await page.$$('.guide-product-card');
  console.log('cards: ' + cards.length);
  for (let i = 0; i < Math.min(parseInt(n || '4', 10), cards.length); i++) {
    await cards[i].evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(400);
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
