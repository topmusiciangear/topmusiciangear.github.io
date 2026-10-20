// Captura la card que contiene cierto texto. Uso: node temp/card_by_title.js <url> <out.png> "<texto>"
const { chromium } = require('playwright');

(async () => {
  const [url, out, needle] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.addStyleTag({ content: 'iframe,[id*="float"],[class*="float"]{display:none!important}' });
  await page.waitForTimeout(3000);
  const handle = await page.evaluateHandle(t => [...document.querySelectorAll('.guide-product-card')].find(c => c.textContent.includes(t)) || null, needle);
  const el = handle.asElement();
  if (!el) { console.error('no encontrada: ' + needle); await browser.close(); process.exit(1); }
  await el.evaluate(n => n.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(500);
  const b = await el.boundingBox();
  await page.screenshot({ path: out, clip: { x: b.x, y: Math.max(0, b.y), width: b.width, height: Math.min(b.height, 1100) } });
  console.log('ok ' + out);
  await browser.close();
})();
