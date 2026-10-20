// Uso: node temp/shots.js <url> <prefix> <selector>
const { chromium } = require('playwright');

(async () => {
  const [url, prefix, selector] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.waitForTimeout(1200);
  const box = await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    el.scrollIntoView();
    const r = el.getBoundingClientRect();
    return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height };
  }, selector);
  if (!box) { console.error('no selector ' + selector); process.exit(1); }
  console.log(JSON.stringify(box));
  const H = 700;
  const pages = Math.min(3, Math.ceil(box.h / H));
  for (let i = 0; i < pages; i++) {
    const y = box.y + i * H;
    await page.screenshot({
      path: prefix + '_' + i + '.png',
      clip: { x: box.x, y, width: box.w, height: Math.min(H, box.y + box.h - y) },
      fullPage: true,
    });
  }
  console.log('ok ' + pages);
  await browser.close();
})();
