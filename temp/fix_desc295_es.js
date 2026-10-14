const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const p = JSON.parse(fs.readFileSync(P, 'utf8'));
const arr = Array.isArray(p) ? p : p.products;
const x = arr.find(y => y.id === 295);
const before = 'una pastilla single coil al cuello y un humbucker al puente';
const after = 'un humbucker Alnico II al cuello y un humbucker Alnico V al puente';
if (x.desc_es.includes(before)) {
  x.desc_es = x.desc_es.split(before).join(after);
  console.log('desc295 ES corregida');
} else {
  console.log('frase ES no encontrada');
}
fs.writeFileSync(P, JSON.stringify(p, null, 2));