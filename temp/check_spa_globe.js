const { chromium } = require('playwright');

const norm = s => s.replace(/gl[gc]\w*?(\d+|Geo\d*)/g, 'ID').replace(/id="[^"]*"/g, 'id="X"').replace(/url\(#[^)]*\)/g, 'url(#X)');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.goto('http://127.0.0.1:8899/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(1500);

  const res = await page.evaluate(async () => {
    const products = await (await fetch('/data/products.json')).json();
    const list = products.products || products;
    let picked = null;
    for (const p of list) {
      const html = window.tmgStoreButtons ? window.tmgStoreButtons(p) : '';
      if (!html) continue;
      const div = document.createElement('div');
      div.innerHTML = html;
      const pb = div.querySelector('.shop-btn-primary');
      if (pb && pb.getAttribute('data-store') === 'amazon' && div.querySelector('[data-store="reverb"]')) {
        picked = { product: p.title, html };
        break;
      }
    }
    if (!picked) return { error: 'no hay producto con primario Amazon' };

    const wrap = document.createElement('div');
    wrap.className = 'shop-buttons-wrap';
    wrap.style.width = '420px';
    wrap.innerHTML = picked.html;
    document.body.appendChild(wrap);
    window.__tmgGeoResolved = 'musicstore';
    window.tmgGeoSwap();
    await new Promise(r => setTimeout(r, 300));

    const listEl = wrap.querySelector('.shop-more-list');
    const rows = [...listEl.children].map(el => {
      const wm = el.querySelector('.shop-wm');
      const svg = el.querySelector('svg');
      return {
        store: el.getAttribute('data-store'),
        text: el.textContent.trim().slice(0, 24),
        inWordmark: !!(wm && svg && wm.contains(svg)),
        svg: svg ? svg.outerHTML : null,
      };
    });
    const prim = wrap.querySelector('.shop-btn-primary');
    const out = { producto: picked.product, primario: prim.textContent.trim().slice(0, 40), rows };
    wrap.remove();
    return out;
  });

  if (res.error) { console.log('ERROR:', res.error); await browser.close(); return; }
  console.log('producto:', res.producto, '| primario:', res.primario);
  res.rows.forEach(r => console.log(' ', String(r.store).padEnd(11), '|', r.text.padEnd(24), '| icono en wordmark:', r.inWordmark));
  const amz = res.rows.find(r => r.store === 'amazon');
  const rev = res.rows.find(r => r.store === 'reverb');
  console.log('globo amazon === reverb (SPA):', amz && rev ? norm(amz.svg) === norm(rev.svg) : 'faltan filas');
  console.log('filas vacias:', res.rows.filter(r => !r.text).length);
  await browser.close();
})();
