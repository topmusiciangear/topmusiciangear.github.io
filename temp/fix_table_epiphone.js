const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

// Epiphone Les Paul Special-II E1 values for each row
const epiphoneValues = [
  { value: 'Heavy riffs for beginners', value_es: 'Riffs pesados para principiantes' },
  { value: 'Mahogany', value_es: 'Caoba' },
  { value: 'Bolt-on mahogany, SlimTaper D', value_es: 'Caoba atornillada, SlimTaper D' },
  { value: '22, rosewood', value_es: '22, palisandro' },
  { value: '2 open-coil humbuckers (700T/650R)', value_es: '2 humbuckers de bobina abierta (700T/650R)' },
  { value: '24.75 in (628 mm)', value_es: '24,75" (628 mm)' },
  { value: 'Tune-o-matic + stopbar', value_es: 'Tune-o-matic + stopbar' },
  { value: 'Covered, 14:1 ratio', value_es: 'Cubiertas, ratio 14:1' },
  { value: '~7.5 lb (3.4 kg)', value_es: '~3,4 kg' }
];

// Insert Epiphone column at position 3 (between Col 2 and Col 3)
pt.rows.forEach((row, ri) => {
  if (row.values) {
    row.values.splice(3, 0, epiphoneValues[ri]);
  }
});

// Verify
console.log('Columns after insert:', pt.rows[0].values.length);
pt.rows[0].values.forEach((v, vi) => console.log('  Col ' + vi + ': ' + v.value));

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado');
