const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '').trim();
const map = {};
arr.forEach(p => { const k = norm(p.title); (map[k] = map[k] || []).push(p); });
const dups = Object.values(map).filter(v => v.length > 1);
console.log('productos en catalogo: ' + arr.length);
console.log('titulos duplicados: ' + dups.length + '\n');
dups.forEach(v => {
  console.log('>>> ' + v[0].title);
  v.forEach(p => {
    console.log('    id ' + String(p.id).padEnd(5) + ' | $' + String(p.price).padEnd(9) + ' | cat ' + String(p.category).padEnd(14) +
      ' | img ' + String((p.img || '').slice(0, 58)) + ' | tiendas: ' + Object.keys(p.stores || {}).join(','));
  });
  const p1 = v[0], p2 = v[1];
  const mismaImg = (p1.img || '') === (p2.img || '');
  const mismoPrecio = p1.price === p2.price;
  console.log('    -> misma foto: ' + mismaImg + ' | mismo precio: ' + mismoPrecio);
  console.log('');
});
fs.writeFileSync(BASE + 'temp/dup_products.txt', dups.map(v =>
  v[0].title + ' -> ids ' + v.map(p => p.id).join(',') + ' | precios ' + v.map(p => p.price).join(',') + ' | img igual: ' + ((v[0].img||'')===(v[1].img||''))
).join('\n'));