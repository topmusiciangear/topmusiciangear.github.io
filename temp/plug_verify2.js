const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
console.log('=== dobles y repeticiones ===');
let bad = 0;
const pats = ['Arturia Arturia', 'Native Instruments Native', 'Universal Audio Universal', 'Universal Audio UAD Sound City Studios delivers legendary rock room to',
  'Synchro Arts Synchro', 'Two Notes Audio Engineering Two', 'Vengeance Sound Vengeance', 'Reveal Sound Reveal',
  'u-he u-he', 'Celemony Celemony', 'iZotope iZotope', 'Sonible Sonible', 'Acon Acon', 'Zynaptiq Zynaptiq',
  'IK Multimedia IK', 'Kiive Audio Kiive', 'Softube Softube', 'Tokyo Dawn Labs Tokyo', 'Brainworx Brainworx',
  'Mastering The Mix Mastering', 'MeldaProduction MeldaProduction', 'Audiomodern Audiomodern',
  'SongWish SongWish', 'W.A. Production W.A.', 'XLN Audio XLN', ' 5 5', 'Standard Standard', 'Pro Pro'];
guides.forEach(g => {
  const s = JSON.stringify(g);
  pats.forEach(d => {
    if (s.includes(d)) { bad++; console.log('MAL en ' + g.id + ': [' + d + ']'); }
  });
});
console.log(bad ? 'HAY ' + bad : 'sin dobles');
console.log('=== que cambio en no-plugins ===');
['best-interface', 'budget-interfaces', 'scarlett-vs-volt', 'streaming-interfaces'].forEach(id => {
  const s = JSON.stringify(guides.find(x => x.id === id));
  ['Kontakt 8', 'GENOME', 'Diva', 'Spire', 'Noire', 'Massive X', 'Phase Plant', 'PitchMap', '1176'].forEach(b => {
    let i = -1, n = 0;
    while ((i = s.indexOf(b, i + 1)) > -1 && n < 4) {
      n++;
      console.log(id + ' [' + b + ']: ...' + s.slice(Math.max(0, i - 70), i + b.length + 40).replace(/\\n/g, ' '));
    }
  });
});
console.log('=== tablas ===');
['repitch-vs-melodyne', 'vocalign-vs-revoice-pro'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log(id + ': ' + g.productTable.title + ' / ' + g.productTable.title_es);
});
