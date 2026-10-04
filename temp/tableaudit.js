const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
// Price row formats across productTables
const fmts = {};
G.forEach(g => {
  if (!g.productTable) return;
  (g.productTable.rows || []).forEach(r => {
    const lab = (r.label || '').toLowerCase();
    if (/price|precio/.test(lab)) {
      (r.values || []).forEach(v => {
        const s = v.value || '';
        const pat = s.replace(/[\d,]+/g, '#').replace(/\s+/g, ' ').slice(0, 60);
        fmts[pat] = (fmts[pat] || 0) + 1;
      });
    }
  });
});
console.log('PRICE FORMATS:');
Object.entries(fmts).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([k, v]) => console.log(v + 'x: ' + k));
// Best For labels present?
let bf = 0, noBf = [];
G.forEach(g => {
  if (!g.productTable) return;
  const has = (g.productTable.rows || []).some(r => /best for|ideal para/i.test(r.label || '') || /best for|ideal para/i.test(r.label_es || ''));
  if (has) bf++; else noBf.push(g.id);
});
console.log('tables con BestFor:', bf, 'sin:', noBf.join(','));
// comparison tables: price rows?
let compPrice = 0;
G.forEach(g => {
  if (!g.comparison) return;
  const has = (g.comparison.rows || []).some(r => /price|precio/i.test(r.label || ''));
  if (has) compPrice++;
});
console.log('comparison con precio:', compPrice, '/', G.filter(g => g.comparison).length);