const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

[30, 1033].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('=== ' + id + ' | ' + p.brand + ' | ' + p.title + ' | price=' + p.price + ' | cat=' + p.category);
  console.log('  img: ' + p.img);
  console.log('  desc: ' + p.desc);
  console.log('  desc_es: ' + p.desc_es);
  console.log('  stores: ' + Object.keys(p.stores || {}).join(', '));
  const en = [], es = [];
  guides.forEach(g => {
    const all = [].concat(g.featuredProducts || [], ...(g.sections || []).map(s => s.products || []));
    if (all.includes(id)) en.push(g.id);
  });
  console.log('  en guias: ' + (en.join(', ') || 'ninguna'));
  console.log('');
});
// otros duplicados brand+titulo
const byT = {};
products.forEach(p => { const k = p.brand + '|' + p.title; (byT[k] = byT[k] || []).push(p.id); });
const dups = Object.keys(byT).filter(k => byT[k].length > 1);
console.log('duplicados brand+titulo en el catalogo: ' + dups.length);
dups.forEach(k => console.log('  ' + k + ' -> ' + byT[k].join(', ')));