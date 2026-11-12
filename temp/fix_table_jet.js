const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

// Jet Guitars JS-300 values (Col 4) - correct values
const jetValues = [
  { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' },
  { value: 'Poplar', value_es: 'Álamo' },
  { value: 'Slim GRG maple', value_es: 'Arce GRG delgado' },
  { value: '24, maple', value_es: '24, arce' },
  { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' },
  { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
  { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' },
  { value: 'Die-cast', value_es: 'De fundición' },
  { value: '~7.7 lb (3.5 kg)', value_es: '~3,5 kg' }
];

// Fix Col 4 (Jet) values
pt.rows.forEach((row, ri) => {
  if (row.values && row.values[4]) {
    row.values[4] = jetValues[ri];
  }
});

// Verify
console.log('After fix:');
pt.rows.forEach((r, ri) => {
  if (r.values) {
    console.log('Row ' + ri + ': Col3=' + r.values[3].value + ' | Col4=' + r.values[4].value);
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado');
