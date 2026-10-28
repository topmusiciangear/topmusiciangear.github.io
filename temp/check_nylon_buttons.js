const { chromium } = require('playwright');

const only = ['Cordoba C5', 'C40II', 'Ortega R121', 'CG122MSH', 'GA35TCE', 'Protege C1'];

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.route('**/ipinfo.io/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ country: 'ES' }) }));
  await page.route('**/cdn-cgi/trace', r => r.fulfill({ status: 200, contentType: 'text/plain', body: 'loc=ES' }));
  await page.goto('http://127.0.0.1:8899/guides/best-nylon-guitars-for-beginners.html', { waitUntil: 'load' });
  await page.waitForTimeout(2000);

  const cards = await page.evaluate((only) => {
    const out = [];
    document.querySelectorAll('div').forEach(div => {
      if (!div.className || String(div.className).indexOf('guide-product-card') < 0) return;
      if (!div.querySelector('.shop-btn-primary') || out.some(o => o.el === div)) return;
      out.push({ el: div });
    });
    return out.map(({ el }) => {
      const name = (el.querySelector('h3, h4, .guide-product-card-title') || {}).textContent || '';
      if (!only.some(o => name.indexOf(o) >= 0)) return null;
      const prim = el.querySelector('.shop-btn-primary');
      const rows = [...el.querySelectorAll('.shop-more-list > a')].map(a => ({
        store: a.getAttribute('data-store') || '(sin store)',
        text: a.textContent.trim().replace(/\s+/g, ' '),
        href: a.getAttribute('href') || '',
        display: getComputedStyle(a).display,
      }));
      return {
        name: name.trim(),
        primary: { store: prim.getAttribute('data-store'), text: prim.textContent.trim().replace(/\s+/g, ' '), href: prim.getAttribute('href') },
        rows,
      };
    }).filter(Boolean);
  }, only);

  for (const c of cards) {
    console.log('\n### ' + c.name);
    console.log('  PRIMARIO [' + c.primary.store + '] ' + c.primary.text);
    console.log('    ' + String(c.primary.href).slice(0, 110));
    c.rows.forEach(r => console.log('   ' + r.store.padEnd(11), r.display === 'none' ? '(oculta)' : '        ', r.text.padEnd(34), String(r.href).slice(0, 95)));
  }
  await browser.close();
})();
