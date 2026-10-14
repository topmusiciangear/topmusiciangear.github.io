const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
const rows = [];
let totalMiss = 0;
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  if (!feat.length) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  const miss = feat.filter(id => !solo.includes(id));
  if (miss.length) {
    totalMiss += miss.length;
    rows.push({ id: g.id, n: miss.length, miss: miss.map(i => i + ' ' + (byId[i] ? byId[i].title : '?')).join(' | ') });
  }
});
rows.sort((a, b) => b.n - a.n);
console.log('GUIAS con destacados sin review: ' + rows.length + ' | reviews que faltan: ' + totalMiss + '\n');
rows.forEach(r => console.log('  ' + String(r.n).padStart(2) + '  ' + r.id + '\n      ' + r.miss));