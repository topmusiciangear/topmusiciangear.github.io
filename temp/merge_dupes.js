// Fusion duplicados: 184->440 (Ultra II), 320->312 (PRS SE Custom 24).
const fs = require('fs');
let P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const swap = (from, to) => {
  G.forEach(g => (g.sections || []).forEach(s => {
    if ((s.products || []).includes(from)) s.products = s.products.map(id => (id === from ? to : id));
  }));
};
swap(184, 440);
swap(320, 312);
P = P.filter(p => p.id !== 184 && p.id !== 320);
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2) + '\n');
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
let b = fs.readFileSync('build-guides.js', 'utf8');
[184, 320].forEach(id => {
  const re = new RegExp('  ' + id + ':\\s*\\{(?:[\\s\\S]*?)\\r?\\n  \\},?\\r?\\n', '');
  const m = b.match(re);
  if (!m) throw new Error('BTN ' + id + ' no localizado');
  b = b.replace(re, '');
});
fs.writeFileSync('build-guides.js', b);
// verificacion
const P3 = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const G3 = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const b3 = fs.readFileSync('build-guides.js', 'utf8');
console.log('184/320 en catalogo: ' + P3.some(p => p.id === 184 || p.id === 320));
console.log('BTN 184/320: ' + [/^\s*184:\s*\{/m.test(b3), /^\s*320:\s*\{/m.test(b3)].join('/'));
['fender-guide', 'best-electric-guitar', 'pro-guitars', 'best-electric-guitars-2026'].forEach(gid => {
  const g = G3.find(x => x.id === gid);
  if (!g || !g.productTable) { console.log(gid + ': sin tabla propia'); return; }
  const union = [...new Set(g.sections.flatMap(s => s.products))];
  console.log(gid + ': cards=' + union.length + ' cols=' + g.productTable.columns.length + ' verdict=' + (g.verdictProsCons || []).length);
});
