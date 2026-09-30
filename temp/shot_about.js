const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('file:///C:/Users/Daniel/projects/topmusiciangear/es/index.html');
  await page.waitForTimeout(800);
  const el = await page.$('#about');
  if (el) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await el.screenshot({ path: 'temp/about_es.png' }); console.log('ok'); }
  else console.log('NO-ABOUT');
  await browser.close();
})();
