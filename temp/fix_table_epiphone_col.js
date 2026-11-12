const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

const epiphoneValues = [
  { value: 'Best all-rounder for most beginners', value_es: 'Todo-terreno para la mayoría de principiantes' },
  { value: 'Poplar', value_es: 'Álamo' },
  { value: 'Slim GRG maple', value_es: 'Mástil GRG delgado de arce' },
  { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' },
  { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
  { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' },
  { value: 'Die-cast', value_es: 'Fundición' },
  { value: '~7.7 lb (3.5 kg)', value_es: '~7,7 lb (3,5 kg)' }
];

pt.rows.forEach((row, ri) => {
  if (row.values) {
    row.values[3] = epiphoneValues[ri];
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado con columna Epiphone corregida');
