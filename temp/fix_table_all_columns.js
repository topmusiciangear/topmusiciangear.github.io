const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const guide = g.find(x => x.id === 'best-beginner-electric-guitar');
const pt = guide.productTable;

// Correct data for all 11 columns (0-10)
// Based on user specification and prior fixes
const rowsData = [
  // Row 0: Best For - 11 columns
  [
    'Best all-rounder for most beginners',        // Col 0: Yamaha Pacifica 112V
    'First rock riffs for beginners',             // Col 1: Squier Affinity Series Stratocaster
    'Simple start for beginners',                 // Col 2: Squier Sonic Stratocaster HT
    'Heavy riffs for beginners',                  // Col 3: Epiphone Les Paul Special-II E1
    'Comfortable learning for beginners',         // Col 4: Jet Guitars JS-300
    'Rock, punk & metal beginners',               // Col 5: Ibanez Gio GRG121DX
    'Kids & smaller hands',                       // Col 6: Squier Sonic Mustang
    'Play anywhere, no amp needed',               // Col 7: Enya Nova Go Sonic
    'Serious start for committed beginners',      // Col 8: Yamaha Revstar Element RSE20
    'Squier Debut Series Stratocaster',           // Col 9: Squier Debut Series Stratocaster
    'Serious start for committed beginners'       // Col 10: (extra/duplicate column)
  ],
  // Row 1: Body Wood - 11 columns
  [
    'Alder',                                      // Col 0
    'Poplar',                                     // Col 1
    'Poplar',                                     // Col 2
    'Mahogany',                                   // Col 3: Epiphone
    'Roasted poplar',                             // Col 4: Jet JS-300
    'Poplar',                                     // Col 5: Ibanez Gio
    'Poplar (offset)',                            // Col 6: Squier Mustang
    'Carbon fiber',                               // Col 7: Enya
    'Chambered mahogany',                         // Col 8: Yamaha Revstar
    'Poplar',                                     // Col 9: Squier Debut
    'Chambered mahogany'                          // Col 10: (extra)
  ],
  // Row 2: Neck - 11 columns
  [
    'C-shape maple',                              // Col 0
    'C-shape maple, satin',                       // Col 1
    'Slim C-shape maple',                         // Col 2
    'Bolt-on mahogany, SlimTaper D',              // Col 3: Epiphone
    'Canadian roasted maple, Modern C',           // Col 4: Jet JS-300
    'Slim GRG maple',                             // Col 5: Ibanez Gio
    'Slim C-shape maple',                         // Col 6: Squier Mustang
    'C-shape composite',                          // Col 7: Enya
    '3-piece mahogany, set-in',                   // Col 8: Yamaha Revstar
    'Slim C-shape maple, satin',                  // Col 9: Squier Debut
    'Slim C-shape maple, satin'                   // Col 10: (extra)
  ],
  // Row 3: Frets & Fretboard - 11 columns
  [
    '22 medium, rosewood',                        // Col 0
    '21 medium jumbo, maple/laurel',             // Col 1
    '21 medium, maple',                           // Col 2
    '22, rosewood',                               // Col 3: Epiphone
    '22, roasted maple',                          // Col 4: Jet JS-300
    '24, purpleheart / bound',                    // Col 5: Ibanez Gio
    '22 medium jumbo, maple/laurel',             // Col 6: Squier Mustang
    '22, composite',                              // Col 7: Enya
    '22 jumbo, rosewood, 12" radius',             // Col 8: Yamaha Revstar
    '21 medium jumbo, laurel',                   // Col 9: Squier Debut
    '21 medium jumbo, laurel'                    // Col 10: (extra)
  ],
  // Row 4: Pickups - 11 columns
  [
    'HSS — humbucker + 2 singles',               // Col 0
    '3 ceramic single coils',                     // Col 1
    '3 ceramic single coils',                     // Col 2
    '2 open-coil humbuckers (700T/650R)',        // Col 3: Epiphone
    '3 ceramic single coils',                     // Col 4: Jet JS-300
    '2 IBZ-6 humbuckers',                         // Col 5: Ibanez Gio
    '2 ceramic single coils',                     // Col 6: Squier Mustang
    '2 humbuckers (Alnico II/V)',                // Col 7: Enya
    '2 Alnico V humbuckers (VH3n/VH3b)',         // Col 8: Yamaha Revstar
    '3 ceramic single coils',                     // Col 9: Squier Debut
    '3 ceramic single coils'                      // Col 10: (extra)
  ],
  // Row 5: Scale Length - 11 columns
  [
    '25.5 in (648 mm)',                           // Col 0: Yamaha
    '25.5 in (648 mm)',                           // Col 1: Squier Affinity
    '25.5 in (648 mm)',                           // Col 2: Squier Sonic
    '24.75 in (628 mm)',                          // Col 3: Epiphone LP Special-II E1
    '25.5 in (648 mm)',                           // Col 4: Jet JS-300
    '25.5 in (648 mm)',                           // Col 5: Ibanez Gio
    '25.5 in (648 mm)',                           // Col 6: Squier Mustang
    '24 in (610 mm)',                             // Col 7: Enya Nova Go
    '24.75 in (629 mm)',                          // Col 8: Yamaha Revstar Element
    '25.5 in (648 mm)',                           // Col 9: Squier Debut
    '25.5 in (648 mm)'                            // Col 10: (extra)
  ],
  // Row 6: Bridge - 11 columns
  [
    'Vintage-style tremolo',                      // Col 0
    '2-point sync tremolo',                       // Col 1
    'Fixed (hardtail)',                           // Col 2
    'Tune-o-matic + stopbar',                     // Col 3: Epiphone
    'Synchronized tremolo',                       // Col 4: Jet JS-300
    'Fixed F106 bridge',                          // Col 5: Ibanez Gio
    'Fixed 6-saddle hardtail',                    // Col 6: Squier Mustang
    'Tune-o-matic',                               // Col 7: Enya
    'Tune-o-matic + stopbar',                     // Col 8: Yamaha Revstar
    '6-saddle vintage tremolo',                   // Col 9: Squier Debut
    '6-saddle vintage tremolo'                    // Col 10: (extra)
  ],
  // Row 7: Tuners - 11 columns
  [
    'Sealed die-cast',                            // Col 0
    'Sealed die-cast',                            // Col 1
    'Sealed',                                     // Col 2
    'Covered, 14:1 ratio',                        // Col 3: Epiphone
    'Chrome die-cast',                            // Col 4: Jet JS-300
    'Die-cast',                                   // Col 5: Ibanez Gio
    'Sealed die-cast',                            // Col 6: Squier Mustang
    'Sealed',                                     // Col 7: Enya
    'Die-cast',                                   // Col 8: Yamaha Revstar
    'Sealed-gear die-cast',                       // Col 9: Squier Debut
    'Sealed-gear die-cast'                        // Col 10: (extra)
  ],
  // Row 8: Weight - 11 columns
  [
    '~7.5 lb (3.4 kg)',                           // Col 0
    '~7.5 lb (3.4 kg)',                           // Col 1
    '~7.0 lb (3.2 kg)',                           // Col 2
    '~7.5 lb (3.4 kg)',                           // Col 3: Epiphone
    '~7.7 lb (3.5 kg)',                           // Col 4: Jet JS-300
    '~7.7 lb (3.5 kg)',                           // Col 5: Ibanez Gio
    '~7.7 lb (3.5 kg)',                           // Col 6: Squier Mustang
    '~6.0 lb (2.7 kg)',                           // Col 7: Enya Nova Go
    '~6.0 lb (2.7 kg)',                           // Col 8: Yamaha Revstar Element
    '~6.0 lb (2.7 kg)',                           // Col 9: Squier Debut
    '~6.8 lb (3.1 kg)'                            // Col 10: (extra)
  ]
];

pt.rows.forEach((row, ri) => {
  if (row.values && row.values.length === 11) {
    row.values = rowsData[ri].map(value => ({
      value: value,
      value_es: value // placeholder, will be updated separately or keep same
    }));
    console.log('Row ' + ri + ' updated successfully with 11 columns');
  } else {
    console.log('Row ' + ri + ' has ' + (row.values ? row.values.length : 'no values') + ' columns, expected 11');
  }
});

fs.writeFileSync(p, JSON.stringify(g, null, 2), 'utf8');
console.log('data/guides.json actualizado con tabla completa de 11 columnas');