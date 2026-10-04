const fs = require('fs');
const { rangeFor, mapId } = require('C:/Users/Daniel/projects/topmusiciangear/temp/rangelib.js');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
let n = 0;
G.forEach(g => {
  if (!g.comparison || !g.featuredSnippet) return;
  const fsn = g.featuredSnippet;
  const has = (g.comparison.rows || []).some(r => /price|precio/i.test(r.label || ''));
  if (has) return;
  const mk = (nm) => {
    if (!nm) return '—';
    const id = mapId(nm);
    if (!id) return '—';
    const r = rangeFor(id);
    if (!r) return '—';
    return r;
  };
  const v1 = mk(fsn.name1_en), v2 = mk(fsn.name2_en);
  g.comparison.rows.unshift({ label: 'Price', label_es: 'Precio', val1: v1, val2: v2, val1_es: v1, val2_es: v2 });
  n++;
});
console.log('unshifted:', n);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(G, null, 2));
const G2 = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const h = G2.find(x => x.id === 'hs8-vs-rokit-7');
console.log('hs8 rows[0]:', JSON.stringify(h.comparison.rows[0]));