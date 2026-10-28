const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const pages = [
    'https://topmusiciangear.com/guides/best-nylon-guitars-for-beginners.html',
    'https://topmusiciangear.com/guides/best-nylon-guitars-for-beginners_es.html',
    'https://topmusiciangear.com/guides/starter-studio.html',
  ];
  for (const url of pages) {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1200);

    const base = await page.evaluate(() => {
      const mb = document.querySelector('.guide-section-mediabuy');
      const img = mb && mb.querySelector('.guide-section-img');
      return {
        marginTop: mb ? getComputedStyle(mb).marginTop : null,
        wrapperOverflow: img ? getComputedStyle(img.parentElement).overflow : null,
        blocks: document.querySelectorAll('.guide-section-mediabuy').length,
      };
    });

    const btn = page.locator('.guide-section-mediabuy .shop-btn-more').first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await page.waitForTimeout(600);
    const dd = await btn.evaluate(el => {
      const l = el.nextElementSibling;
      const r = l.getBoundingClientRect();
      return {
        h: Math.round(r.height),
        rows: [...l.querySelectorAll('a')].filter(a => a.getBoundingClientRect().height > 1).length,
        review: Math.round(l.nextElementSibling.getBoundingClientRect().height),
      };
    });

    const img = page.locator('.guide-section-mediabuy .guide-section-img').first();
    await img.scrollIntoViewIfNeeded();
    const b1 = await img.boundingBox();
    await page.mouse.move(b1.x + b1.width / 2, b1.y + b1.height / 2, { steps: 6 });
    await page.waitForTimeout(450);
    const zoom = await img.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const p = el.parentElement.getBoundingClientRect();
      return {
        hover: el.matches(':hover'),
        transform: el.matches(':hover') ? getComputedStyle(el).transform : 'none',
        growsOutsideWrapper: Math.round(r.width) > Math.round(p.width) + 2,
        w: Math.round(r.width), pw: Math.round(p.width),
      };
    });
    console.log(url.split('/').pop(), '| spacing', base.marginTop, '| wrapper overflow', base.wrapperOverflow,
      '| dropdown', JSON.stringify(dd), '| zoom', JSON.stringify(zoom));
    await page.close();
  }
  await browser.close();
})();
