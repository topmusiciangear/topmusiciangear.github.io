const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

// Correct data for each row and column
// Each entry is [value_en, value_es]
const rowsData = [
  // Row 0: Best For
  [
    ['Best all-rounder for most beginners', 'La más versátil para la mayoría'],
    ['First rock riffs for beginners', 'Primeros riffs de rock para empezar'],
    ['Simple start for beginners', 'Arranque sencillo para principiantes'],
    ['Heavy riffs for beginners', 'Riffs pesados para principiantes'],
    ['Comfortable learning for beginners', 'Aprendizaje cómodo para principiantes'],
    ['Rock, punk & metal beginners', 'Principiantes de rock, punk y metal'],
    ['Kids & smaller hands', 'Niños y manos pequeñas'],
    ['Play anywhere, no amp needed', 'Tocar en cualquier lugar, sin amplificador'],
    ['Serious start for committed beginners', 'Inicio serio para principiantes comprometidos'],
    ['Tightest budget Strat start', 'El inicio de Strat más ajustado']
  ],
  // Row 1: Body Wood
  [
    ['Alder', 'Aliso'],
    ['Poplar', 'Álamo'],
    ['Poplar', 'Álamo'],
    ['Mahogany', 'Mogano'],
    ['Roasted poplar', 'Poplar asado'],
    ['Poplar', 'Álamo'],
    ['Carbon fiber', 'Fibra de carbono'],
    ['Chambered mahogany', 'Caoba con cámaras'],
    ['Poplar', 'Álamo'],
    ['Chambered mahogany', 'Caoba con cámaras']
  ],
  // Row 2: Neck
  [
    ['C-shape maple', 'C-shaped maple'],
    ['C-shape maple, satin', 'C-shaped maple, satin'],
    ['Slim C-shape maple', 'C-shape delgado de arce'],
    ['Bolt-on mahogany, SlimTaper D', 'Mandos de mahogany enclavado, SlimTaper D'],
    ['Canadian roasted maple, Modern C', 'Arce asado canadiense, C moderna'],
    ['Slim GRG maple', 'C-shape GRG delgado'],
    ['Slim C-shape maple', 'C-shape delgado de arce'],
    ['C-shape composite', 'C-shape compuesto'],
    ['3-piece mahogany, set-in', 'Mahogany de 3 piezas, encastado'],
    ['Slim C-shape maple, satin', 'C-shape delgado de arce, satinado']
  ],
  // Row 3: Frets & Fretboard
  [
    ['22 medium, rosewood', '22 medianos, ébano'],
    ['21 medium jumbo, maple/laurel', '21 medium jumbo, arce/lauro'],
    ['21 medium, maple', '21 medianos, arce'],
    ['22, rosewood', '22, ébano'],
    ['22, roasted maple', '22, arce asado'],
    ['24, purpleheart / bound', '24, purpleheart / enlazado'],
    ['22 medium jumbo, maple/laurel', '22 medium jumbo, arce/lauro'],
    ['22, composite', '22, compuesto'],
    ['22 jumbo, rosewood, 12" radius', '22 jumbo, ébano, radio 12"'],
    ['21 medium jumbo, laurel', '21 medium jumbo, laurel']
  ],
  // Row 4: Pickups
  [
    ['HSS — humbucker + 2 singles', 'HSS — humbucker + 2 singles'],
    ['3 ceramic single coils', '3 single coils de cerámica'],
    ['3 ceramic single coils', '3 single coils de cerámica'],
    ['2 open-coil humbuckers (700T/650R)', '2 humbuckers de bobina abierta (700T/650R)'],
    ['3 ceramic single coils', '3 single coils de cerámica'],
    ['2 IBZ-6 humbuckers', '2 humbuckers IBZ-6'],
    ['2 ceramic single coils', '2 single coils de cerámica'],
    ['2 humbuckers (Alnico II/V)', '2 humbuckers Alnico II/V'],
    ['2 Alnico V humbuckers (VH3n/VH3b)', '2 humbuckers Alnico V (VH3n/VH3b)'],
    ['3 ceramic single coils', '3 single coils de cerámica']
  ],
  // Row 5: Scale Length
  [
    ['25.5 in (648 mm)', '25.5 in (648 mm)'],
    ['25.5 in (648 mm)', '25.5 in (648 mm)'],
    ['25.5 in (648 mm)', '25.5 in (648 mm)'],
    ['24.75 in (628 mm)', '24.75 in (628 mm)'],
    ['25.5 in (648 mm)', '25.5 in (648 mm)'],
    ['25.5 in (648 mm)', '25.5 in (648 mm)'],
    ['25.5 in (648 mm)', '25.5 in (648 mm)'],
    ['24 in (610 mm)', '24 in (610 mm)'],
    ['24.75 in (629 mm)', '24.75 in (629 mm)'],
    ['25.5 in (648 mm)', '25.5 in (648 mm)']
  ],
  // Row 6: Bridge
  [
    ['Vintage-style tremolo', 'Tremolo estilo vintage'],
    ['2-point sync tremolo', 'Tremolo de 2 puntos sync'],
    ['Fixed (hardtail)', 'Fijo (hardtail)'],
    ['Tune-o-matic + stopbar', 'Tune-o-matic + stopbar'],
    ['Synchronized tremolo', 'Tremolo sincronizado'],
    ['Fixed F106 bridge', 'Puente fijo F106'],
    ['Fixed 6-saddle hardtail', 'Hardtail fijo de 6 silla'],
    ['Tune-o-matic', 'Tune-o-matic'],
    ['Tune-o-matic + stopbar', 'Tune-o-matic + stopbar'],
    ['6-saddle vintage tremolo', 'Tremolo vintage de 6 silla']
  ],
  // Row 7: Tuners
  [
    ['Sealed die-cast', 'Mecanizados sellados'],
    ['Sealed die-cast', 'Mecanizados sellados'],
    ['Sealed', 'Sellado'],
    ['Covered, 14:1 ratio', 'Cubierto, razón 14:1'],
    ['Chrome die-cast', 'Mecanizados de cromo'],
    ['Die-cast', 'Mecanizados fundidos'],
    ['Sealed die-cast', 'Mecanizados sellados'],
    ['Sealed', 'Sellado'],
    ['Die-cast', 'Mecanizados fundidos'],
    ['Sealed-gear die-cast', 'Mecanizados sellados-engranaje']
  ],
  // Row 8: Weight
  [
    ['~7.5 lb (3.4 kg)', '~7.5 lb (3.4 kg)'],
    ['~7.5 lb (3.4 kg)', '~7.5 lb (3.4 kg)'],
    ['~7.0 lb (3.2 kg)', '~7.0 lb (3.2 kg)'],
    ['~7.5 lb (3.4 kg)', '~7.5 lb (3.4 kg)'],
    ['~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)'],
    ['~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)'],
    ['~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)'],
    ['~6.0 lb (2.7 kg)', '~6.0 lb (2.7 kg)'],
    ['~6.0 lb (2.7 kg)', '~6.0 lb (2.7 kg)'],
    ['~6.8 lb (3.1 kg)', '~6.8 lb (3.1 kg)']
  ]
];

pt.rows.forEach((row, ri) => {
  if (row.values && row.values.length === 10) {
    row.values = rowsData[ri].map(([value_en, value_es]) => ({
      value: value_en,
      value_es: value_es
    }));
    console.log('Row ' + ri + ' updated successfully');
  } else {
    console.log('Row ' + ri + ' has no values or wrong length');
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado con tabla completa de 10 columnas');