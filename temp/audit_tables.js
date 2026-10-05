const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
// Map product title -> guide/column index for tables with product columns.
// productTable columns are titles; comparison rows are spec pairs (VS guides).
// Goal: collect Power/Type/Speaker/Weight cells keyed by normalized product title,
// then report same-product different-values across guides.
const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const byProduct = {};
function add(prod, guide, label, val, valEs) {
  const k = norm(prod);
  if (!k) return;
  byProduct[k] = byProduct[k] || [];
  byProduct[k].push({ guide, label, val, valEs });
}
for (const g of G) {
  const pt = g.productTable;
  if (pt && pt.columns && pt.rows) {
    pt.columns.forEach((c, i) => {
      const prod = c.title || '';
      pt.rows.forEach(r => {
        const v = (r.values || [])[i];
        if (v && /power|potencia|weight|peso|speaker|altavoz|type|tipo/i.test(r.label || '')) {
          add(prod, g.id, r.label, v.value, v.value_es);
        }
      });
    });
  }
}
let n = 0;
for (const [prod, cells] of Object.entries(byProduct)) {
  const byLabel = {};
  cells.forEach(c => { byLabel[c.label] = byLabel[c.label] || new Set(); byLabel[c.label].add(c.val); });
  for (const [label, vals] of Object.entries(byLabel)) {
    if (vals.size > 1) {
      n++;
      console.log('CONTRADICTION: [' + prod + '] ' + label);
      cells.filter(c => c.label === label).forEach(c => console.log('   ' + c.guide + ' => ' + c.val + ' / ' + c.valEs));
    }
  }
}
console.log('total contradictions: ' + n + ' across ' + Object.keys(byProduct).length + ' products');