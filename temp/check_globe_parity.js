const { chromium } = require('playwright');

const norm = s => s.replace(/gl[gc]\w*?(\d+|Geo\d*)/g, 'ID').replace(/id="[^"]*"/g, 'id="X"').replace(/url\(#[^)]*\)/g, 'url(#X)');

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
    const rows = [...list.querySelectorAll('[data-store]')].map(a => {
      const wm = a.querySelector('.shop-wm');
      const svg = a.querySelector('svg');
      const r = a.getBoundingClientRect();
      if (!svg) return { store: a.getAttribute('data-store'), svg: null, rowH: Math.round(r.height) };
      const rs = svg.getBoundingClientRect(), rw = wm.getBoundingClientRect();
      return {
        store: a.getAttribute('data-store'),
        inWordmark: wm.contains(svg),
        extraWrapper: !!a.querySelector('a > span[style*="display:flex"]'),
        svg: svg.outerHTML,
        iconH: Math.round(rs.height),
        offsetY: Math.round(rs.y - rw.y),
        rowH: Math.round(r.height),
      };
    });
    const primary = document.querySelector('.guide-section-mediabuy .shop-btn-primary');
    return { primary: primary ? primary.textContent.trim() : null, rows };
  });

  const amz = out.rows.find(r => r.store === 'amazon');
  const rev = out.rows.find(r => r.store === 'reverb');
  console.log('primario:', out.primary);
  out.rows.forEach(r => console.log(' ', r.store.padEnd(11), 'svg:', r.svg ? 'si' : 'NO', '| en wordmark:', r.inWordmark, '| offsetY:', r.offsetY, '| rowH:', r.rowH));
  console.log('\nglobo amazon === globo reverb (ignorando ids):', amz && rev ? norm(amz.svg) === norm(rev.svg) : 'faltan filas');
  console.log('brillo presente en amazon:', amz && amz.svg ? amz.svg.includes('opacity=".25"') : false);
  if (amz && rev && norm(amz.svg) !== norm(rev.svg)) {
    console.log('\nAMAZON:', norm(amz.svg));
    console.log('\nREVERB:', norm(rev.svg));
  }
  await browser.close();
})();
