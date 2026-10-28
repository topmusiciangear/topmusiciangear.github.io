const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  for (const vp of [{ w: 390, h: 844 }, { w: 768, h: 1024 }, { w: 1920, h: 1080 }]) {
    const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
    await page.route('**/*', r => r.request().url().startsWith('http://127.0.0.1:8899') ? r.continue() : r.abort());
    await page.goto('http://127.0.0.1:8899/guides/best-nylon-guitars-for-beginners_es.html', { waitUntil: 'load' });
    await page.waitForTimeout(300);

    const btn = page.locator('.guide-section-mediabuy .shop-btn-more').first();
    await btn.scrollIntoViewIfNeeded();
    const b = await btn.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForTimeout(350);
    await btn.click();
    await page.waitForTimeout(500);
    const open = await btn.evaluate(el => {
      const l = el.nextElementSibling;
      const r = l.getBoundingClientRect();
      return {
        h: Math.round(r.height),
        rows: [...l.querySelectorAll('a')].filter(a => a.getBoundingClientRect().height > 1).length,
        review: Math.round(l.nextElementSibling.getBoundingClientRect().height),
        docOverflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });

    const img = page.locator('.guide-section-mediabuy .guide-section-img').first();
    await img.scrollIntoViewIfNeeded();
    const ib = await img.boundingBox();
    await page.mouse.move(ib.x + ib.width / 2, ib.y + ib.height / 2, { steps: 5 });
    await page.waitForTimeout(350);
    const zoom = await img.evaluate(el => ({
      hover: el.matches(':hover'),
      transform: el.matches(':hover') ? getComputedStyle(el).transform : 'none',
      w: Math.round(el.getBoundingClientRect().width),
      h: Math.round(el.getBoundingClientRect().height),
    }));

    console.log(vp.w + 'px -> dropdown', JSON.stringify(open), '| zoom', JSON.stringify(zoom));
    await page.close();
  }
  await browser.close();
})();
