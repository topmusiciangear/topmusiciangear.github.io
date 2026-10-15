const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);
const rows = []; let tot = 0;
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  if (!feat.length) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  // productos que estan en veredictos o tabla pero sin review
  const vp = (g.verdictProsCons || []).map(v => v.name);
  const enVp = arr.filter(p => vp.some(n => n === p.title || p.title.indexOf(n) === 0 || n.indexOf(p.title) === 0));
  const cand = enVp.filter(p => !solo.includes(p.id));
  if (cand.length) { tot += cand.length; rows.push({ id: g.id, n: cand.length, list: cand.map(p => p.id + ' ' + p.title) }); }
});
rows.sort((a, b) => b.n - a.n);
console.log('GUIAS con productos (tabla/veredictos) sin review: ' + rows.length + ' | reviews que faltan: ' + tot + '\n');
rows.forEach(r => console.log('  ' + String(r.n).padStart(2) + '  ' + r.id + '\n      ' + r.list.join('\n      ')));