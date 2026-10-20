// Uso: node temp/elshoot.js <url> <out.png> <selector> [dsf]
const { chromium } = require('playwright');

(async () => {
  const [url, out, selector, dsf] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1400, height: 1200 },
    deviceScaleFactor: parseFloat(dsf || '2'),
  });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.addStyleTag({ content: 'iframe,[id*="float"],[class*="float"]{display:none!important}' });
  await page.waitForTimeout(1500);
  const el = await page.$(selector);
  if (!el) { console.error('no selector'); process.exit(1); }
  await el.evaluate(n => n.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(400);
  const b = await el.boundingBox();
  if (!b) { console.error('sin caja'); process.exit(1); }
  const y = Math.max(0, b.y);
  await page.screenshot({
    path: out,
    clip: { x: Math.max(0, b.x), y, width: Math.min(b.width, 1400), height: Math.min(b.height, 1200 - y) },
  });
  console.log('ok ' + out);
  await browser.close();
})();
