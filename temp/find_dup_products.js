const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Recolecta todos los ids usados por las guias (verdictProsCons.name, tablas, sections.products, featuredProducts)
const used = new Set();
const num = (v) => typeof v === 'number' ? v : (typeof v === 'string' && /^\d+$/.test(v) ? Number(v) : null);

const scan = (g) => {
  (g.verdictProsCons || []).forEach(v => {
    [v.id, v.productId].forEach(x => { const n = num(x); if (n) used.add(n); });
  });
  if (g.productTable && g.productTable.columns) g.productTable.columns.forEach(c => {
    [c.id, c.productId].forEach(x => { const n = num(x); if (n) used.add(n); });
  });
  (g.sections || []).forEach(s => (s.products || []).forEach(x => { const n = num(x); if (n) used.add(n); }));
  [g.featuredProducts, g.products].forEach(a => (Array.isArray(a) ? a : []).forEach(x => {
    const n = num(x) || num(x && (x.id || x.productId)); if (n) used.add(n);
  }));
};
guides.forEach(scan);

console.log('Ids distintos referenciados por las guias: ' + used.size);

// ids duplicados dentro del catalogo por titulo
const byTitle = {};
JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8')).forEach(p => {
  const k = p.title || p.title_es;
  (byTitle[k] = byTitle[k] || []).push(p);
});

const dups = Object.entries(byTitle).filter(([, v]) => v.length > 1);
console.log('\nTitulos duplicados en products.json: ' + dups.length);
let huerfanos = 0;
dups.forEach(([t, v]) => {
  const info = v.map(p => p.id + (used.has(p.id) ? '(usada)' : '(HUERFANA)')).join(' + ');
  if (v.some(p => !used.has(p.id))) huerfanos++;
  console.log('  ' + t + ' -> ' + info);
});
console.log('\nTitulos duplicados con alguna entrada huerfana: ' + huerfanos);
