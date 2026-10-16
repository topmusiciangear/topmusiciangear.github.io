const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-interface', 'budget-interfaces', 'scarlett-vs-volt', 'streaming-interfaces'].forEach(id => {
  const s = JSON.stringify(guides.find(x => x.id === id));
  const brands = ['Arturia', 'Native Instruments', 'Universal Audio', 'u-he', 'Kilohearts', 'Reveal Sound', 'Vengeance', 'IK Multimedia', 'Two Notes', 'Kiive Audio', 'Softube', 'Synchro Arts', 'Celemony', 'iZotope Nectar', 'Tokyo Dawn', 'Brainworx', 'Mastering The Mix', 'Zynaptiq PitchMap', 'MeldaProduction', 'Audiomodern', 'SongWish', 'W.A. Production', 'XLN Audio Addictive'];
  brands.forEach(b => {
    let i = -1;
    while ((i = s.indexOf(b, i + 1)) > -1) {
      console.log(id + ': ...' + s.slice(Math.max(0, i - 80), i + b.length + 60).replace(/\\n/g, ' '));
      break;
    }
  });
});
console.log('=== dobles ===');
let bad = 0;
guides.forEach(g => {
  const s = JSON.stringify(g);
  ['Arturia Arturia', 'Native Instruments Native', 'Universal Audio Universal', 'Synchro Arts Synchro', 'Two Notes Two Notes', 'UAD UAD', 'UA UA', 'Reveal Sound Reveal', 'u-he u-he', 'Vengeance Vengeance', 'Celemony Celemony', 'iZotope iZotope', 'Sonible Sonible', 'Acon Acon', 'Zynaptiq Zynaptiq', 'IK Multimedia IK', 'Kiive Audio Kiive', 'Softube Softube', 'Tokyo Dawn Labs Tokyo', 'Brainworx Brainworx', 'Mastering The Mix Mastering', 'MeldaProduction MeldaProduction', 'Audiomodern Audiomodern', 'SongWish SongWish', 'W.A. Production W.A.', 'XLN Audio XLN'].forEach(d => {
    if (s.includes(d)) { bad++; console.log('DOBLE en ' + g.id + ': ' + d); }
  });
});
console.log(bad ? 'HAY ' + bad : 'sin dobles');
console.log('=== tablas comparativas ===');
['repitch-vs-melodyne', 'vocalign-vs-revoice-pro'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log(id + ' tabla: ' + g.productTable.title + ' / ' + g.productTable.title_es);
});
