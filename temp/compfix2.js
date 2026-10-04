const fs = require('fs');
const { rangeFor, mapId } = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
let n = 0;
G.forEach(g => {
  if (!g.comparison || !g.featuredSnippet) return;
  const fsn = g.featuredSnippet;
  const has = (g.comparison.rows || []).some(r => /price|precio|estim/i.test(r.label || ''));
  if (has) return;
  const mk = (nm) => {
    if (!nm) return '—';
    const id = mapId(nm);
    if (!id) return '—';
    return rangeFor(id) || '—';
  };
  g.comparison.rows.unshift({
    label: 'Estimated Price', label_es: 'Precio estimado',
    val1: mk(fsn.name1_en), val2: mk(fsn.name2_en),
    val1_es: mk(fsn.name1_en), val2_es: mk(fsn.name2_en)
  });
  n++;
});
// normalize monitor-setup "Price (approx.)" + 2 missing label_es
G.forEach(g => {
  if (g.productTable) (g.productTable.rows || []).forEach(r => {
    if (r.label === 'Price (approx.)') { r.label = 'Estimated Price'; }
    if (r.label === 'Estimated Price' && !r.label_es) r.label_es = 'Precio estimado';
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('comparison rows added:', n);