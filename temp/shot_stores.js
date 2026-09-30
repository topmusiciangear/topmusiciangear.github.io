const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const w of [1280, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('file:///C:/Users/Daniel/projects/topmusiciangear/index.html');
    await page.waitForTimeout(800);
    const el = await page.$('.stores-section');
    await el.screenshot({ path: 'temp/stores_' + w + '.png' });
    console.log('ok ' + w);
    await page.close();
  }
  await browser.close();
})();
