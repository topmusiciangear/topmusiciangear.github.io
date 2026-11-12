const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

const rowsData = [
  // Row 0: Best For
  ['Best all-rounder for most beginners', 'First rock riffs for beginners', 'Simple start for beginners', 'Heavy riffs for beginners', 'Comfortable learning for beginners', 'Rock, punk & metal beginners', 'Kids & smaller hands', 'Play anywhere, no amp needed', 'Serious start for committed beginners', 'Tightest budget Strat start'],
  // Row 1: Body Wood
  ['Alder', 'Poplar', 'Poplar', 'Mahogany', 'Roasted poplar', 'Poplar', 'Poplar (offset)', 'Carbon fiber', 'Chambered mahogany', 'Poplar'],
  // Row 2: Neck
  ['C-shape maple', 'C-shape maple, satin', 'Slim C-shape maple', 'Bolt-on mahogany, SlimTaper D', 'Canadian roasted maple, Modern C', 'Slim GRG maple', 'Slim C-shape maple', 'C-shape composite', '3-piece mahogany, set-in', 'Slim C-shape maple, satin'],
  // Row 3: Frets & Fretboard
  ['22 medium, rosewood', '21 medium jumbo, maple/laurel', '21 medium, maple', '22, rosewood', '22, roasted maple', '24, purpleheart / bound', '22 medium jumbo, maple/laurel', '22, composite', '22 jumbo, rosewood, 12" radius', '21 medium jumbo, laurel'],
  // Row 4: Pickups
  ['HSS — humbucker + 2 singles', '3 ceramic single coils', '3 ceramic single coils', '2 open-coil humbuckers (700T/650R)', '3 ceramic single coils', '2 IBZ-6 humbuckers', '2 ceramic single coils', '2 humbuckers (Alnico II/V)', '2 Alnico V humbuckers (VH3n/VH3b)', '3 ceramic single coils'],
  // Row 5: Scale Length
  ['25.5 in (648 mm)', '25.5 in (648 mm)', '25.5 in (648 mm)', '24.75 in (628 mm)', '25.5 in (648 mm)', '25.5 in (648 mm)', '25.5 in (648 mm)', '24 in (610 mm)', '24.75 in (629 mm)', '25.5 in (648 mm)'],
  // Row 6: Bridge
  ['Vintage-style tremolo', '2-point sync tremolo', 'Fixed (hardtail)', 'Tune-o-matic + stopbar', 'Synchronized tremolo', 'Fixed F106 bridge', 'Fixed 6-saddle hardtail', 'Tune-o-matic', 'Tune-o-matic + stopbar', '6-saddle vintage tremolo'],
  // Row 7: Tuners
  ['Sealed die-cast', 'Sealed die-cast', 'Sealed', 'Covered, 14:1 ratio', 'Chrome die-cast', 'Die-cast', 'Sealed die-cast', 'Sealed', 'Die-cast', 'Sealed-gear die-cast'],
  // Row 8: Weight
  ['~7.5 lb (3.4 kg)', '~7.5 lb (3.4 kg)', '~7.0 lb (3.2 kg)', '~7.5 lb (3.4 kg)', '~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)', '~6.0 lb (2.7 kg)', '~6.0 lb (2.7 kg)', '~6.8 lb (3.1 kg)']
];

pt.rows.forEach((row, ri) => {
  if (row.values && row.values.length === 10) {
    row.values = [...rowsData[ri]];
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado con tabla completa de 10 columnas');
