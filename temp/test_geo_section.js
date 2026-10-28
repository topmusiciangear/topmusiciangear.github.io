const fs = require('fs');
const vm = require('vm');
const { parseHTML } = require('linkedom');

const html = fs.readFileSync(process.argv[2] || 'guides/best-nylon-guitars-for-beginners_es.html', 'utf8');
const code = fs.readFileSync('temp/geo_inline_extracted.js', 'utf8');
const country = process.argv[3] || 'DE';

function run(countryIso) {
  const { window, document } = parseHTML(html);
  const ctx = {
    document,
    window,
    Intl,
    console,
    setTimeout,
    XMLHttpRequest: function () {
      this.open = (m, url) => { this.url = url; };
      this.send = () => {
        this.responseText = this.url.includes('ipinfo') ? JSON.stringify({ country: countryIso }) : 'loc=' + countryIso;
        if (this.onload) this.onload.call(this);
      };
    }
  };
  ctx.window.XMLHttpRequest = ctx.XMLHttpRequest;
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return document;
}

function report(doc) {
  const wrappers = doc.querySelectorAll('.guide-product-card-stores, .guide-section-buy');
  const out = [];
  wrappers.forEach((c, i) => {
    const pb = c.querySelector('.shop-btn-primary');
    if (!pb) { out.push({ i, primary: 'NONE' }); return; }
    const ml = c.querySelector('.shop-more-list');
    const rows = ml ? [...ml.querySelectorAll('[data-store]')].map(r => r.getAttribute('data-store')) : [];
    out.push({
      i,
      primary: pb.getAttribute('data-store'),
      btnText: pb.textContent.replace(/\s+/g, ' ').trim().slice(0, 60),
      rows,
      rowCount: rows.length,
      hiddenRows: ml ? [...ml.querySelectorAll('[data-store]')].filter(r => r.style.display === 'none').map(r => r.getAttribute('data-store')) : []
    });
  });
  return out;
}

const before = report(parseHTML(html).document);
console.log('BEFORE primary set:', [...new Set(before.map(x => x.primary))]);
console.log('BEFORE row counts:', [...new Set(before.map(x => x.rowCount))]);

const after = report(run(country));
console.log('\nCOUNTRY', country);
console.log('primary set:', [...new Set(after.map(x => x.primary))]);
console.log('row counts:', [...new Set(after.map(x => x.rowCount))]);
console.log('sections:');
after.forEach(a => {
  if (a.primary === 'NONE') { console.log('  MISSING PRIMARY'); return; }
  console.log('  [' + a.primary + '] rows=' + a.rowCount + ' hidden=' + JSON.stringify(a.hiddenRows) + ' :: ' + a.btnText);
});
