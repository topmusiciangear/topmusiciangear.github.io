const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8');
const p = JSON.parse(raw);
console.log('tipo raiz: ' + (Array.isArray(p) ? 'array' : typeof p));
console.log('claves raiz: ' + (Array.isArray(p) ? '(array)' : Object.keys(p).join(', ')));

const arr = Array.isArray(p) ? p : (p.products || []);
console.log('elementos: ' + arr.length);
console.log('\n=== PRIMER ELEMENTO (claves) ===');
if (arr[0]) console.log(Object.keys(arr[0]).join(', '));

// buscar por texto libre en todo el JSON
const terms = ['X1 R', 'X1R', 'SE Electronics', '260432', 'SE- Electronics'];
terms.forEach(t => {
  const n = (raw.match(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
  console.log('  "' + t + '" aparece ' + n + ' veces en el archivo');
});

console.log('\n=== PRODUCTOS CUYO NOMBRE MENCIONE "ELECTRONICS" O "SE " ===');
arr.filter(x => /electronics|\bSE\b/i.test(x.name || '') || /electronics|\bSE\b/i.test(x.title || ''))
   .forEach(x => console.log('  ' + (x.id) + '  ' + (x.name || x.title)));
