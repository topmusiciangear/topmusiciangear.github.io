// Captura la portada (hero) y una miniatura de seccion. Uso: node temp/shot_hero.js <url> <out>
const { chromium } = require('playwright');

(async () => {
  const [url, out] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.evaluate(() => document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }));
  await page.waitForTimeout(2500);
  const hero = await page.$('.guide-detail-img');
  await hero.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(400);
  await hero.screenshot({ path: out });
  const thumb = await page.$('.guide-section-img');
  if (thumb) {
    await thumb.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.waitForTimeout(400);
    await thumb.screenshot({ path: out.replace('.png', '_thumb.png') });
  }
  console.log('ok');
  await browser.close();
})();
