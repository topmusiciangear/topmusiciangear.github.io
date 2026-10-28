const { chromium } = require('playwright');

const norm = s => s.replace(/gl[gc]\w*?(Geo)?\d*/g, 'ID').replace(/url\(#[^)]*\)/g, 'url(#X)');

(async () => {
  const url = process.argv[2] || 'https://topmusiciangear.com/guides/best-nylon-guitars-for-beginners_es.html';
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(3500);

  const btn = page.locator('.guide-section-mediabuy .shop-btn-more').first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await page.waitForTimeout(700);

  const out = await page.evaluate(() => {
    const list = document.querySelector('.guide-section-mediabuy .shop-more-list');
    const rows = [...list.querySelectorAll('[data-store]')].map(el => {
      const wm = el.querySelector('.shop-wm'), svg = el.querySelector('svg');
      const r = el.getBoundingClientRect();
      return {
        store: el.getAttribute('data-store'),
        text: el.textContent.trim().slice(0, 26),
        visible: getComputedStyle(el).display !== 'none',
        inWm: !!(wm && svg && wm.contains(svg)),
        rowH: Math.round(r.height),
        offsetY: wm && svg ? Math.round(svg.getBoundingClientRect().y - wm.getBoundingClientRect().y) : null,
        svg: svg ? svg.outerHTML : null,
        empty: !el.textContent.trim(),
      };
    });
    const prim = document.querySelector('.guide-section-mediabuy .shop-btn-primary');
    return { primary: prim ? { store: prim.getAttribute('data-store'), text: prim.textContent.trim().slice(0, 40) } : null, rows };
  });

  console.log('URL:', url.split('/').pop());
  console.log('primario:', JSON.stringify(out.primary));
  out.rows.forEach(r => console.log('  ' + String(r.store).padEnd(11), r.visible ? 'vis' : 'oculta', '|', r.text.padEnd(26), '| rowH', r.rowH, '| offset', r.offsetY, '| en wordmark', r.inWm));
  const amz = out.rows.find(r => r.store === 'amazon');
  const rev = out.rows.find(r => r.store === 'reverb');
  console.log('globo amazon === reverb:', amz && rev && amz.svg ? norm(amz.svg) === norm(rev.svg) : 'n/a');
  console.log('brillo en amazon:', amz && amz.svg ? amz.svg.includes('opacity=".25"') : false);
  console.log('filas vacias:', out.rows.filter(r => r.empty).length);
  const bad = out.rows.filter(r => r.visible && r.rowH > 50);
  console.log('filas deformadas (>50px):', bad.length ? bad.map(b => b.store + ':' + b.rowH).join(', ') : 'ninguna');
  await browser.close();
})();
