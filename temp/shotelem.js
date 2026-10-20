// Uso: node temp/shotelem.js <url> <out.png> <selector> [width]
const { chromium } = require('playwright');

(async () => {
  const [url, out, selector, w] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: parseInt(w || '1400', 10), height: 1200 }, deviceScaleFactor: 2 });
  await page.route('**/*', r => {
    const u = r.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('data:')) return r.continue();
    return r.abort();
  });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  // ocultar reproductor flotante y banners para que no tapen
  await page.addStyleTag({ content: 'iframe,[class*="floating"],[id*="floating"],[class*="video-float"],[class*="sticky-video"]{display:none !important}' });
  await page.waitForTimeout(1200);
  const els = await page.$$(selector);
  console.log('elementos: ' + els.length);
  const max = Math.min(els.length, parseInt(process.argv[5] || '4', 10));
  for (let i = 0; i < max; i++) {
    await els[i].evaluate(n => n.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(250);
    await els[i].screenshot({ path: out.replace('%d', i) });
  }
  console.log('ok');
  await browser.close();
})();
