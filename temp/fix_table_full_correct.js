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

const jetValues = [
  { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' },
  { value: 'Poplar', value_es: 'Álamo' },
  { value: 'Slim GRG maple', value_es: 'Mástil GRG delgado de arce' },
  { value: '2 IBZ-6 humbuckers', value_es: '2 humbuckers IBZ-6' },
  { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
  { value: 'Fixed F106 bridge', value_es: 'Puente fijo F106' },
  { value: 'Die-cast', value_es: 'Fundición' },
  { value: '~7.7 lb (3.5 kg)', value_es: '~7,7 lb (3,5 kg)' }
];

const ibanezValues = [
  { value: 'Kids & smaller hands', value_es: 'Niños y manos pequeñas' },
  { value: 'Poplar (offset)', value_es: 'Álamo (offset)' },
  { value: 'Slim C-shape maple', value_es: 'Mástil en C delgado de arce' },
  { value: '24, maple', value_es: '24, arce' },
  { value: '3 ceramic single coils', value_es: '3 pastillas de bobina simple cerámica' },
  { value: '24 in (610 mm)', value_es: '24" (610 mm)' },
  { value: 'Fixed 6-saddle hardtail', value_es: 'Puente fijo de 6 selletas' },
  { value: 'Sealed die-cast', value_es: 'Fundición sellada' },
  { value: '~6.0 lb (2.7 kg)', value_es: '~6,0 lb (2,7 kg)' }
];

const squirtValues = [
  { value: 'Play anywhere, no amp needed', value_es: 'Tocar en cualquier lugar, sin amplificador' },
  { value: 'Carbon fiber', value_es: 'Fibra de carbono' },
  { value: 'C-shape composite', value_es: 'Mástil compuesto en C' },
  { value: '22, composite', value_es: '22 trastes, compuesto' },
  { value: '2 humbuckers (Alnico II/V)', value_es: '2 humbuckers (Alnico II/V)' },
  { value: '24.75 in (629 mm)', value_es: '24,75" (629 mm)' },
  { value: 'Tune-o-matic', value_es: 'Tune-o-matic' },
  { value: 'Sealed', value_es: 'Sellado' },
  { value: '~6.0 lb (2.7 kg)', value_es: '~6,0 lb (2,7 kg)' }
];

const yamahaValues = [
  { value: 'Serious start for committed beginners', value_es: 'Inicio serio para principiantes comprometidos' },
  { value: 'Chambered mahogany', value_es: 'Caoba con cámaras' },
  { value: '3-piece mahogany, set-in', value_es: 'Caoba maciza de 3 piezas, clavijero atornillado' },
  { value: '22 jumbo, rosewood, 12" radius', value_es: '22 trastes jumbo, palisandro, radio de 12 pulgadas' },
  { value: '2 humbuckers (Alnico II/V)', value_es: '2 humbuckers (Alnico II/V)' },
  { value: '24.75 in (628 mm)', value_es: '24,75" (628 mm)' },
  { value: 'Tune-o-matic + stopbar', value_es: 'Tune-o-matic + stopbar' },
  { value: 'Die-cast', value_es: 'Fundición' },
  { value: '~7.7 lb (3.5 kg)', value_es: '~7,7 lb (3,5 kg)' }
];

const squirtValues2 = [
  { value: 'Rock, punk & metal beginners', value_es: 'Principiantes de rock, punk y metal' },
  { value: 'Poplar', value_es: 'Álamo' },
  { value: 'Slim C-shape maple', value_es: 'Mástil en C delgado de arce' },
  { value: '24, maple', value_es: '24, arce' },
  { value: '3 ceramic single coils', value_es: '3 pastillas de bobina simple cerámica' },
  { value: '25.5 in (648 mm)', value_es: '25,5" (648 mm)' },
  { value: 'Synchronized tremolo', value_es: 'Trémolo sincronizado' },
  { value: 'Chrome die-cast', value_es: 'Fundición cromo' },
  { value: '~7.7 lb (3.5 kg)', value_es: '~7,7 lb (3,5 kg)' }
];

pt.rows.forEach((row, ri) => {
  if (row.values) {
    row.values[3] = epiphoneValues[ri];
    row.values[4] = jetValues[ri];
    row.values[5] = ibanezValues[ri];
    row.values[6] = squirtValues[ri];
    row.values[7] = yamahaValues[ri];
    row.values[8] = squirtValues2[ri];
    row.values[9] = yamahaValues[ri];
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado con tabla completa de 10 columnas');
