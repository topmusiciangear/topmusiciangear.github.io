const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const isHub = (g) => /-vs-/.test(g.id) || /^pro-/.test(g.id);

const rows = [];
guides.forEach(g => {
  if (isHub(g)) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1);
  const vp = (g.verdictProsCons || []).map(v => v.name || v.title).filter(Boolean);
  const enVp = arr.filter(p => vp.some(n => n === p.title || p.title.indexOf(n) === 0 || n.indexOf(p.title) === 0));
  const miss = enVp.filter(p => !solo.some(s => s.products[0] === p.id));
  if (!miss.length) return;
  rows.push({
    id: g.id, title: g.title_es || g.title, cat: g.category || '?',
    total: enVp.length, fichas: solo.length, miss: miss.length,
    productos: miss.map(p => p.title)
  });
});
rows.sort((a, b) => b.miss - a.miss || b.total - a.total);
const byCat = {};
rows.forEach(r => { (byCat[r.cat] = byCat[r.cat] || []).push(r); });
console.log('TOTAL: ' + rows.length + ' guias | ' + rows.reduce((s, r) => s + r.miss, 0) + ' reviews pendientes\n');
Object.keys(byCat).sort((a, b) => byCat[b].length - byCat[a].length).forEach(c => {
  console.log('===== ' + c + ' (' + byCat[c].length + ' guias, ' + byCat[c].reduce((s, r) => s + r.miss, 0) + ' reviews) =====');
  byCat[c].forEach(r => {
    console.log('  ' + String(r.miss).padStart(2) + ' | ' + r.title.slice(0, 52) + '  [' + r.fichas + '/' + r.total + ' fichas]');
    r.productos.forEach(p => console.log('       - ' + p));
  });
  console.log('');
});