const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const nuevos = [1047, 1043, 1044, 1048, 1042, 1046];

console.log('=== LO QUE SE VE REALMENTE EN LA CARD (primeros 160 caracteres) ===\n');
nuevos.forEach(id => {
  const p = products.find(x => x.id === id);
  const d = p.desc || '';
  const v = d.slice(0, 160);
  const cortado = d.length > 160;
  console.log('--- ' + p.id + ' ' + p.title + '  (' + d.length + ' car., ' + (cortado ? 'SE CORTA' : 'cabe entero') + ')');
  console.log('    "' + v + (cortado ? '…' : '') + '"');
  console.log('');
});
