// Verificacion en vivo (produccion) de los botones de la guia de nylon.
// Uso: node temp/verify_live_nylon.js
const { chromium } = require('playwright');

const PAGES = [
  'https://topmusiciangear.com/guides/best-nylon-guitars-for-beginners.html',
  'https://topmusiciangear.com/guides/best-nylon-guitars-for-beginners_es.html',
];
const WANT = {
  'Yamaha C40II': [['gear4music', '£129']],
  'Cordoba C5': [['gear4music', '£319']],
  'Ortega R121': [['musicstore', '€209'], ['zzounds', 'ORTR121'], ['gear4music', 'Ortega%20R121'], ['andertons', 'Ortega%20R121']],
  'Yamaha CG122MSH': [['musicstore', '€289']],
  'Cordoba Protege C1 3/4': [['zzounds', '$229'], ['andertons', '£175']],
};

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  let fails = 0;
  for (const url of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
    await page.route('**/ipinfo.io/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ country: 'ES' }) }));
    await page.route('**/cdn-cgi/trace', r => r.fulfill({ status: 200, contentType: 'text/plain', body: 'loc=ES' }));
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(2500);

    const cards = await page.evaluate(() => {
      const seen = new Set();
      const out = [];
      document.querySelectorAll('div').forEach(div => {
        const cls = String(div.className || '');
        if (cls.indexOf('guide-product-card') < 0) return;
        if (!div.querySelector('.shop-btn-primary') || seen.has(div)) return;
        seen.add(div);
        if (out.some(o => o.el === div)) return;
        out.push({ el: div });
        return;
      });
      return out.map(({ el }) => ({
        name: ((el.querySelector('h3,h4,.guide-product-card-title') || {}).textContent || '').trim(),
        primary: {
          store: el.querySelector('.shop-btn-primary').getAttribute('data-store'),
          text: el.querySelector('.shop-btn-primary').textContent.replace(/\s+/g, ' ').trim(),
          href: el.querySelector('.shop-btn-primary').getAttribute('href') || '',
        },
        rows: [...el.querySelectorAll('.shop-more-list > a')].map(a => ({
          store: a.getAttribute('data-store'),
          text: a.textContent.replace(/\s+/g, ' ').trim(),
          href: a.getAttribute('href') || '',
        })),
      }));
    });

    console.log('\n=== ' + url.split('/').pop());
    for (const [name, checks] of Object.entries(WANT)) {
      const card = cards.find(c => c.name.indexOf(name) >= 0);
      if (!card) { console.log('  FALTA card: ' + name); fails++; continue; }
      const all = [card.primary, ...card.rows];
      for (const [store, needle] of checks) {
        const row = all.find(r => r.store === store);
        const ok = row && ((row.text + ' ' + row.href).indexOf(needle) >= 0);
        if (!ok) fails++;
        console.log('  ' + (ok ? 'OK  ' : 'FAIL') + ' ' + name.padEnd(24) + store.padEnd(11) + (row ? row.text.slice(0, 40) : '(sin fila)'));
      }
    }
    await page.close();
  }
  await browser.close();
  console.log('\n' + (fails ? fails + ' FALLOS' : 'TODO OK'));
})();
