const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const checks = [
  ['Pigments 7', 'Arturia Pigments 7'], ['Diva', 'u-he Diva'], ['Phase Plant', 'Kilohearts Phase Plant'],
  ['VPS Avenger 2', 'Vengeance Sound VPS Avenger 2'], ['Vengeance Avenger 2', 'Vengeance Sound VPS Avenger 2'],
  ['Spire', 'Reveal Sound Spire'], ['Massive X', 'Native Instruments Massive X'], ['reMIDI 4', 'SongWish reMIDI 4'],
  ['Loop Engine 3', 'W.A. Production Loop Engine 3'], ['Playbeat 4', 'Audiomodern Playbeat 4'],
  ['Riffer 4', 'Audiomodern Riffer 4'], ['PitchMap', 'Zynaptiq PitchMap'], ['MeldwayGrand', 'MeldaProduction MeldwayGrand'],
  ['Kontakt 8', 'Native Instruments Kontakt 8'], ['V Collection 11', 'Arturia V Collection 11'],
  ['Addictive Keys', 'XLN Audio Addictive Keys'], ['Noire', 'Native Instruments Noire'],
  ['Augmented Grand Piano', 'Arturia Augmented'], ['Augmented GRAND PIANO', 'Arturia Augmented'],
  ['AmpliTube 5', 'IK Multimedia AmpliTube 5'], ['GENOME', 'Audio Engineering GENOME'],
  ['UAD Sound City Studios', 'Universal Audio UAD'], ['Lunchbox Amp Sim', 'Kiive Audio Lunchbox'],
  ['Amp Room Marshall Suite', 'Softube Amp Room'], ['Amp Room: Marshall Suite', 'Softube Amp Room'],
  ['UA 1176', 'Universal Audio 1176'], ['TDR Kotelnikov GE', 'Tokyo Dawn Labs TDR'],
  ['bx_clipper', 'Brainworx bx_clipper'], ['REFERENCE 3', 'Mastering The Mix REFERENCE'],
  ['Melodyne 5 Essential', 'Celemony Melodyne 5 Essential'], ['VocAlign 7 Pro', 'Synchro Arts VocAlign'],
  ['Revoice Pro', 'Synchro Arts Revoice'], ['RePitch 2', 'Synchro Arts RePitch'],
  ['Nectar 4 Advanced', 'iZotope Nectar 4']
];
let bad = 0;
guides.forEach(g => {
  let s = JSON.stringify(g);
  s = s.replace(/"metaDesc(_es)?":"((?:[^"\\]|\\.)*)"/g, '"meta":""');
  s = s.replace(/https?:\/\/[^"\\ ]+/g, 'URL');
  checks.forEach(([bare, full]) => {
    let i = -1;
    while ((i = s.indexOf(bare, i + 1)) > -1) {
      const ctx = s.slice(Math.max(0, i - 80), i + bare.length + 20);
      if (!ctx.includes(full)) {
        bad++;
        if (bad < 25) console.log(g.id + ' [' + bare + ']: ...' + ctx.replace(/\\n/g, ' '));
      }
    }
  });
});
console.log(bad ? 'RESTOS: ' + bad : 'TODO CON MARCA');
