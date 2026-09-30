const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const w of [1280, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('file:///C:/Users/Daniel/projects/topmusiciangear/index.html');
    await page.waitForTimeout(500);
    const rows = await page.$$eval('.store-logo', els => els.map(a => {
      const name = (a.querySelector('span:last-child') || {}).textContent || '?';
      const icon = a.querySelector('img, svg, .store-badge');
      const r = icon ? icon.getBoundingClientRect() : { width: 0, height: 0 };
      const cs = icon ? getComputedStyle(icon) : {};
      return name.trim() + ' | box=' + Math.round(r.width) + 'x' + Math.round(r.height) +
        ' | css(w/h/maxw)=' + cs.width + '/' + cs.height + '/' + cs.maxWidth;
    }));
    console.log('== viewport ' + w + ' ==');
    rows.forEach(r => console.log(' ' + r));
    await page.close();
  }
  await browser.close();
})();
