const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, timezoneId: 'America/New_York' });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8899/guides/best-nylon-guitars-for-beginners_es.html', { waitUntil: 'load' });
  await page.waitForTimeout(2500);

  const btn = page.locator('.guide-section-mediabuy .shop-btn-more').first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(600);

  const out = await page.evaluate(() => {
    const list = document.querySelector('.guide-section-mediabuy .shop-more-list');
    return [...list.children].map(el => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        store: el.getAttribute('data-store'),
        text: el.textContent.trim().slice(0, 40),
        display: cs.display,
        h: Math.round(r.height),
        html: el.outerHTML.slice(0, 130),
      };
    });
  });
  out.forEach((r, i) => console.log(i, JSON.stringify(r)));
  await browser.close();
})();
