// Uso: node temp/shot.js <url> <out.png> [selector] [width]
const { chromium } = require('playwright');

(async () => {
  const [url, out, selector, w] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: parseInt(w || '1400', 10), height: 900 },
    deviceScaleFactor: 2,
  });
  // solo recursos locales: evita que analytics/ads bloqueen la carga
  await page.route('**/*', route => {
    const u = route.request().url();
    if (u.startsWith('http://127.0.0.1') || u.startsWith('http://localhost') || u.startsWith('data:')) return route.continue();
    return route.abort();
  });
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  await page.evaluate(() => Promise.all(Array.from(document.images).map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))));
  await page.waitForTimeout(400);
  if (selector) {
    const el = await page.$(selector);
    if (!el) { console.error('selector no encontrado: ' + selector); await browser.close(); process.exit(1); }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await el.screenshot({ path: out });
  } else {
    await page.screenshot({ path: out });
  }
  console.log('ok ' + out);
  await browser.close();
})();
