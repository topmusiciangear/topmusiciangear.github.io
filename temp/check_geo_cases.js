const { chromium } = require('playwright');

const norm = s => s.replace(/gl[gc]\w*?(\d+|Geo\d*)/g, 'ID').replace(/id="[^"]*"/g, 'id="X"').replace(/url\(#[^)]*\)/g, 'url(#X)');

async function inspect(page) {
  return page.evaluate(() => {
    const list = document.querySelector('.guide-section-mediabuy .shop-more-list');
    const rows = [...list.children].map(el => {
      const wm = el.querySelector('.shop-wm');
      const svg = el.querySelector('svg');
      return {
        store: el.getAttribute('data-store') || '(vacio)',
        text: el.textContent.trim().slice(0, 22),
        inWm: !!(wm && svg && wm.contains(svg)),
        offsetY: wm && svg ? Math.round(svg.getBoundingClientRect().y - wm.getBoundingClientRect().y) : null,
        svg: svg ? svg.outerHTML : null,
        visible: getComputedStyle(el).display !== 'none',
      };
    });
    const prim = document.querySelector('.guide-section-mediabuy .shop-btn-primary');
    return { primary: prim ? prim.textContent.trim().slice(0, 34) : null, rows };
  });
}

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });

  const cases = [
    { name: 'tz US + ipinfo US (un solo swap)', tz: 'America/New_York', country: 'US' },
    { name: 'tz US + ipinfo ES (doble swap)', tz: 'America/New_York', country: 'ES' },
    { name: 'tz ES + ipinfo ES (sin swap de huso)', tz: 'Europe/Madrid', country: 'ES' },
  ];

  for (const c of cases) {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, timezoneId: c.tz });
    const page = await ctx.newPage();
    await page.route('**/ipinfo.io/**', route => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ country: c.country }) }));
    await page.route('**/cdn-cgi/trace', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'loc=' + c.country + '\n' }));
    await page.goto('http://127.0.0.1:8899/guides/best-nylon-guitars-for-beginners_es.html', { waitUntil: 'load' });
    await page.waitForTimeout(1500);

    const btn = page.locator('.guide-section-mediabuy .shop-btn-more').first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await page.waitForTimeout(500);

    const info = await inspect(page);
    const amz = info.rows.find(r => r.store === 'amazon');
    const rev = info.rows.find(r => r.store === 'reverb');
    const empties = info.rows.filter(r => r.store === '(vacio)').length;
    const dupes = info.rows.length - new Set(info.rows.map(r => r.store)).size;

    console.log('\n### ' + c.name);
    console.log('  primario:', info.primary);
    info.rows.forEach(r => console.log('   ' + r.store.padEnd(11), r.visible ? 'visible' : 'oculta ', '|', r.text.padEnd(22), '| icono en wordmark:', r.inWm, '| offset:', r.offsetY));
    console.log('  globo amazon === reverb:', amz && rev && amz.svg ? norm(amz.svg) === norm(rev.svg) : 'n/a');
    console.log('  filas vacias:', empties, '| duplicadas:', dupes);
    await ctx.close();
  }
  await browser.close();
})();
