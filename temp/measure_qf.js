const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  for (const width of [1440, 1000]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://127.0.0.1:8899/guides/best-nylon-guitars-for-beginners.html', { waitUntil: 'load' });
    const res = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.guide-section-quickfacts .qf-fact')];
      const out = [];
      for (const c of cards) {
        const v = c.querySelector('.qf-value');
        if (!v) continue;
        const before = { text: v.textContent, cardH: c.clientHeight, cardSH: c.scrollHeight };
        v.textContent = '650 mm (25.6 in)';
        const after = {
          cardH: c.clientHeight,
          cardSH: c.scrollHeight,
          cardSW: c.scrollWidth,
          textH: v.getBoundingClientRect().height,
          overflowY: c.scrollHeight > c.clientHeight + 1,
          overflowX: c.scrollWidth > c.clientWidth + 1,
          lines: Math.round(v.getBoundingClientRect().height / parseFloat(getComputedStyle(v).lineHeight)),
        };
        v.textContent = before.text;
        out.push({ before, after });
        break;
      }
      return out;
    });
    console.log('viewport ' + width, JSON.stringify(res, null, 1));
    await page.close();
  }
  await browser.close();
})();
