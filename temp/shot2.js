// Uso: node temp/shot2.js <url> <out.png> <selector> [width] [height]
const { chromium } = require('playwright');

(async () => {
  const [url, out, selector, w, h] = process.argv.slice(2);
  console.log('launch...');
  const browser = await chromium.launch({ args: ['--disable-dev-shm-usage'] });
  const page = await browser.newPage({
    viewport: { width: parseInt(w || '1400', 10), height: parseInt(h || '900', 10) },
    deviceScaleFactor: 2,
  });
  page.setDefaultTimeout(15000);
  await page.route('**/*', route => {
    const u = route.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return route.continue();
    return route.abort();
  });
  console.log('goto...');
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  console.log('imgs...');
  await page.evaluate(() => Promise.all(Array.from(document.images).map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))));
  const box = await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    el.scrollIntoView();
    const r = el.getBoundingClientRect();
    return { x: r.x + window.scrollX, y: r.y + window.scrollY, w: r.width, h: r.height };
  }, selector);
  if (!box) { console.error('selector no encontrado'); await browser.close(); process.exit(1); }
  console.log('box', JSON.stringify(box));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: out,
    clip: { x: box.x, y: box.y, width: box.w, height: Math.min(box.h, 1600) },
    fullPage: true,
  });
  console.log('ok ' + out);
  await browser.close();
})();
