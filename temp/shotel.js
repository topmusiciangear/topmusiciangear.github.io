// Uso: node temp/shotel.js <url> <out.png> <selector> [width] [maxHeight]
const { chromium } = require('playwright');

(async () => {
  const [url, out, selector, w, mh] = process.argv.slice(2);
  const width = parseInt(w || '1400', 10);
  const maxH = parseInt(mh || '1400', 10);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height: Math.min(maxH + 40, 1600) }, deviceScaleFactor: 2 });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.waitForTimeout(1200);

  const el = await page.$(selector);
  if (!el) { console.error('no selector ' + selector); process.exit(1); }
  await el.evaluate(node => node.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await page.waitForTimeout(500);
  const box = await el.boundingBox();
  if (!box) { console.error('sin caja'); process.exit(1); }
  const clip = {
    x: Math.max(0, box.x),
    y: Math.max(0, box.y),
    width: Math.min(box.width, width),
    height: Math.min(box.height, maxH, page.viewportSize().height - Math.max(0, box.y)),
  };
  console.log(JSON.stringify(clip));
  await page.screenshot({ path: out, clip });
  console.log('ok ' + out);
  await browser.close();
})();
