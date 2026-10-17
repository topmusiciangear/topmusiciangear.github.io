const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const list = p.map(x => ({ id: x.id, len: (x.title || '').length, t: x.title }))
  .sort((a, b) => b.len - a.len).slice(0, 12);
console.log('titulos mas largos del catalogo:');
list.forEach(x => console.log('  ' + String(x.len).padStart(3) + '  ' + x.id + '  ' + x.t));
const descLens = p.map(x => (x.desc || '').length).sort((a, b) => a - b);
console.log('\ndesc: min=' + descLens[0] + ' p25=' + descLens[Math.floor(descLens.length * .25)] + ' mediana=' + descLens[Math.floor(descLens.length / 2)] + ' max=' + descLens[descLens.length - 1]);