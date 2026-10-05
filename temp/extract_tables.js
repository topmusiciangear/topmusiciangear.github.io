const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
// Collect every spec cell: product column -> rows. productTable columns are titles.
// comparison (VS) rows: val1/val2 belong to featuredSnippet name1/name2? Use featuredProducts order? For VS guides featuredProducts[0..1] map to val1/val2.
const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
const data = {}; // normProd -> {names:Set, cells:[{guide,label,val,valEs}]}
function add(prod, guide, label, val, valEs) {
  const k = norm(prod);
  if (!k || !val) return;
  data[k] = data[k] || { names: new Set(), cells: [] };
  data[k].names.add(prod);
  data[k].cells.push({ guide, label, val, valEs });
}
for (const g of G) {
  const pt = g.productTable;
  if (pt && pt.columns && pt.rows) {
    pt.columns.forEach((c, i) => {
      pt.rows.forEach(r => {
        const v = (r.values || [])[i];
        if (v && v.value && !/best for|ideal para|estimated price|precio estimado/i.test(r.label || '')) {
          add(c.title, g.id, r.label, v.value, v.value_es);
        }
      });
    });
  }
  if (g.comparison && g.comparison.rows && g.featuredSnippet) {
    const n1 = g.featuredSnippet.name1_en, n2 = g.featuredSnippet.name2_en;
    g.comparison.rows.forEach(r => {
      if (!r.val1 && !r.val2) return;
      const lbl = r.label || r.label_en || '';
      if (/best for|ideal|estimated|precio/i.test(lbl)) return;
      if (n1 && r.val1) add(n1, g.id, lbl, r.val1, r.val1_es);
      if (n2 && r.val2) return add(n2, g.id, lbl, r.val2, r.val2_es);
    });
  }
}
// Report internal contradictions + full inventory stats
let contra = 0;
const report = [];
for (const [prod, d] of Object.entries(data)) {
  const byLabel = {};
  d.cells.forEach(c => { byLabel[c.label] = byLabel[c.label] || new Map(); const m = byLabel[c.label]; m.set(c.val, (m.get(c.val) || []).concat(c.guide)); });
  for (const [label, m] of Object.entries(byLabel)) {
    if (m.size > 1) {
      contra++;
      report.push({ prod, names: [...d.names], label, vals: [...m.entries()].map(([v, gs]) => ({ v, guides: gs })) });
    }
  }
}
fs.writeFileSync(DIR + 'temp/table_audit.json', JSON.stringify({ contra, report }, null, 1));
const nProd = Object.keys(data).length;
let nCells = 0; Object.values(data).forEach(d => nCells += d.cells.length);
console.log('products in tables: ' + nProd + ' | spec cells: ' + nCells + ' | contradictions: ' + contra);
// dump full dataset for verification phase
const ds = {};
for (const [prod, d] of Object.entries(data)) {
  const byLabel = {};
  d.cells.forEach(c => { (byLabel[c.label] = byLabel[c.label] || []).push(c); });
  ds[prod] = { names: [...d.names], labels: byLabel };
}
fs.writeFileSync(DIR + 'temp/table_data.json', JSON.stringify(ds, null, 1));
console.log('dataset written');