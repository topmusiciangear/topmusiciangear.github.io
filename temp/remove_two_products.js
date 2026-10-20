const fs = require('fs');
const raw = fs.readFileSync('data/products.json', 'utf8');
const list = JSON.parse(raw);
const remove = new Set([1044, 1045]);
const kept = list.filter(p => !remove.has(p.id));
const out = JSON.stringify(kept, null, 2);
if (raw !== JSON.stringify(list, null, 2)) {
  console.log('ABORTADO: el archivo no esta en formato JSON.stringify(2)');
  process.exit(1);
}
if (kept.length !== list.length - remove.size) {
  console.log('ABORTADO: no se encontraron los dos productos (borrados ' + (list.length - kept.length) + ')');
  process.exit(1);
}
fs.writeFileSync('data/products.json', out, 'utf8');
console.log('productos: ' + list.length + ' -> ' + kept.length + ' (borrados ' + [...remove].join(', ') + ')');
