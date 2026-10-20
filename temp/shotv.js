// Uso: node temp/shotv.js <url> <out.png> <selector> [width] [maxHeight]
// Captura solo viewport (sin fullPage, evita el stitching fantasma).
const { chromium } = require('playwright');

(async () => {
  const [url, out, selector, w, mh] = process.argv.slice(2);
  const width = parseInt(w || '1400', 10);
  const maxH = parseInt(mh || '1400', 10);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 2 });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.waitForTimeout(1500);
  const r = await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    el.scrollIntoView({ block: 'start' });
    const b = el.getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  }, selector);
  if (!r) { console.error('no selector ' + selector); process.exit(1); }
  await page.waitForTimeout(300);
  const r2 = await page.evaluate(() => {
    const el = document.querySelector(arguments[0]);
    return null;
  }, selector).catch(() => null);
  const box = await page.evaluate(sel => {
    const b = document.querySelector(sel).getBoundingClientRect();
    return { x: b.x, y: b.y, w: b.width, h: b.height };
  }, selector);
  const clip = { x: Math.max(0, box.x), y: Math.max(0, box.y), width: Math.min(box.w, width), height: Math.min(box.h, maxH, 1000 - Math.max(0, box.y)) };
  console.log(JSON.stringify(clip));
  await page.screenshot({ path: out, clip });
  console.log('ok ' + out);
  await browser.close();
})();
