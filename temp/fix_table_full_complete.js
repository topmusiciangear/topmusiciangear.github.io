const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

// Columnas correctas (id -> nombre):
// Col 0: Yamaha Pacifica 112V
// Col 1: Squier Affinity Series Stratocaster
// Col 2: Squier Sonic Stratocaster HT
// Col 3: Epiphone Les Paul Special-II E1
// Col 4: Jet Guitars JS-300
// Col 5: Ibanez Gio GRG121DX
// Col 6: Squier Sonic Mustang
// Col 7: Enya Nova Go Sonic
// Col 8: Yamaha Revstar Element RSE20
// Col 9: Squier Debut Series Stratocaster

const rowsData = [
  {
    label: 'Best For',
    values: [
      'Best all-rounder for most beginners',
      'First rock riffs for beginners',
      'Simple start for beginners',
      'Heavy riffs for beginners',
      'Comfortable learning for beginners',
      'Rock, punk & metal beginners',
      'Kids & smaller hands',
      'Play anywhere, no amp needed',
      'Serious start for committed beginners',
      'Tightest budget Strat start'
    ],
    values_es: [
      'Todo-terreno para la mayoría de principiantes',
      'Primeros riffs de rock para principiantes',
      'Inicio sencillo para principiantes',
      'Riffs pesados para principiantes',
      'Aprendizaje cómodo para principiantes',
      'Principiantes de rock, punk y metal',
      'Niños y manos pequeñas',
      'Tocar en cualquier lugar, sin amplificador',
      'Inicio serio para principiantes comprometidos',
      'El mejor presupuesto Strat de arranque'
    ]
  },
  {
    label: 'Body Wood',
    values: ['Alder', 'Poplar', 'Poplar', 'Mahogany', 'Roasted poplar', 'Poplar', 'Poplar (offset)', 'Carbon fiber', 'Chambered mahogany', 'Poplar'],
    values_es: ['Alder', 'Álamo', 'Álamo', 'Caoba', 'Arce tostado', 'Álamo', 'Álamo (offset)', 'Fibra de carbono', 'Caoba con cámaras', 'Álamo']
  },
  {
    label: 'Neck',
    values: ['C-shape maple', 'C-shape maple, satin', 'Slim C-shape maple', 'Bolt-on mahogany, SlimTaper D', 'Canadian roasted maple, Modern C', 'Slim GRG maple', 'Slim C-shape maple', 'C-shape composite', '3-piece mahogany, set-in', 'Slim C-shape maple, satin'],
    values_es: ['Mástil en C de arce', 'Mástil en C de arce, satinado', 'Mástil en C delgado de arce', 'Mástil atornillado de caoba, SlimTaper D', 'Arce tostado canadiense, Modern C', 'Martillo GRG de arce', 'Mástil en C delgado de arce', 'Mástil compuesto en C', 'Caoba maciza de 3 piezas, clavijero atornillado', 'Mástil en C delgado de arce, satinado']
  },
  {
    label: 'Frets & Fretboard',
    values: ['22 medium, rosewood', '21 medium jumbo, maple/laurel', '21 medium, maple', '22, rosewood', '22, roasted maple', '24, purpleheart / bound', '22 medium jumbo, maple/laurel', '22, composite', '22 jumbo, rosewood, 12" radius', '21 medium jumbo, laurel'],
    values_es: ['22 trastes medios, palisandro', '21 trastes jumbo medios, arce/laurel', '21 trastes medios, arce', '22 trastes, palisandro', '22 trastes, arce tostado', '24 trastes, palo de palo rosa / encuadernado', '21 trastes jumbo medios, arce/laurel', '22 trastes, compuesto', '22 trastes jumbo, palisandro, 12 pulgadas', '21 trastes jumbo medios, laurel']
  },
  {
    label: 'Pickups',
    values: ['HSS — humbucker + 2 singles', '3 ceramic single coils', '3 ceramic single coils', '2 open-coil humbuckers (700T/650R)', '3 ceramic single coils', '2 IBZ-6 humbuckers', '2 ceramic single coils', '2 humbuckers (Alnico II/V)', '2 Alnico V humbuckers (VH3n/VH3b)', '3 ceramic single coils'],
    values_es: ['HSS — humbucker + 2 single-coils', '3 pastillas de bobina simple cerámica', '3 pastillas de bobina simple cerámica', '2 humbuckers de bobina abierta (700T/650R)', '3 pastillas de bobina simple cerámica', '2 humbuckers IBZ-6', '2 pastillas de bobina simple cerámica', '2 humbuckers (Alnico II/V)', '2 humbuckers Alnico V (VH3n/VH3b)', '3 pastillas de bobina simple cerámica']
  },
  {
    label: 'Scale Length',
    values: ['25.5 in (648 mm)', '25.5 in (648 mm)', '25.5 in (648 mm)', '24.75 in (628 mm)', '25.5 in (648 mm)', '25.5 in (648 mm)', '25.5 in (648 mm)', '24 in (610 mm)', '24.75 in (629 mm)', '25.5 in (648 mm)'],
    values_es: ['25,5" (648 mm)', '25,5" (648 mm)', '25,5" (648 mm)', '24,75" (628 mm)', '25,5" (648 mm)', '25,5" (648 mm)', '25,5" (648 mm)', '24" (610 mm)', '24,75" (629 mm)', '25,5" (648 mm)']
  },
  {
    label: 'Bridge',
    values: ['Vintage-style tremolo', '2-point sync tremolo', 'Fixed (hardtail)', 'Tune-o-matic + stopbar', 'Synchronized tremolo', 'Fixed F106 bridge', 'Fixed 6-saddle hardtail', 'Tune-o-matic', 'Tune-o-matic + stopbar', '6-saddle vintage tremolo'],
    values_es: ['Trémolo de estilo vintage', 'Trémolo bidireccional de 2 puntos', 'Puente fijo (hardtail)', 'Tune-o-matic + stopbar', 'Trémolo sincronizado', 'Puente fijo F106', 'Puente fijo de 6 selletas', 'Tune-o-matic', 'Tune-o-matic + stopbar', 'Trémolo vintage de 6 selletas']
  },
  {
    label: 'Tuners',
    values: ['Sealed die-cast', 'Sealed die-cast', 'Sealed', 'Covered, 14:1 ratio', 'Chrome die-cast', 'Die-cast', 'Sealed die-cast', 'Sealed', 'Die-cast', 'Sealed-gear die-cast'],
    values_es: ['Fundición sellada', 'Fundición sellada', 'Sellado', 'Cubierto, relación 14:1', 'Fundición cromo', 'Fundición', 'Fundición sellada', 'Sellado', 'Fundición', 'Fundición de engranajes sellada']
  },
  {
    label: 'Weight',
    values: ['~7.5 lb (3.4 kg)', '~7.5 lb (3.4 kg)', '~7.0 lb (3.2 kg)', '~7.5 lb (3.4 kg)', '~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)', '~7.7 lb (3.5 kg)', '~6.0 lb (2.7 kg)', '~6.0 lb (2.7 kg)', '~6.8 lb (3.1 kg)'],
    values_es: ['~7,5 lb (3,4 kg)', '~7,5 lb (3,4 kg)', '~7,0 lb (3,2 kg)', '~7,5 lb (3,4 kg)', '~7,7 lb (3,5 kg)', '~7,7 lb (3,5 kg)', '~7,7 lb (3,5 kg)', '~6,0 lb (2,7 kg)', '~6,0 lb (2,7 kg)', '~6,8 lb (3,1 kg)']
  }
];

pt.rows.forEach((row, ri) => {
  if (row.values) {
    row.values = rowsData[ri].values;
    row.values_es = rowsData[ri].values_es;
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado con tabla completa de 10 columnas');
