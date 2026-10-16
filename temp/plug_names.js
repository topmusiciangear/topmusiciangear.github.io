const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const renames = {
  60: 'Universal Audio 1176 Classic Limiter Collection',
  61: 'Tokyo Dawn Labs TDR Kotelnikov GE',
  473: 'Brainworx bx_clipper',
  474: 'Mastering The Mix REFERENCE 3',
  1001: 'Arturia Pigments 7',
  1002: 'u-he Diva',
  1003: 'Kilohearts Phase Plant',
  1004: 'Vengeance Sound VPS Avenger 2',
  1005: 'Reveal Sound Spire',
  1006: 'Native Instruments Massive X',
  1008: 'SongWish reMIDI 4',
  1009: 'W.A. Production Loop Engine 3',
  1010: 'Audiomodern Playbeat 4',
  1011: 'Audiomodern Riffer 4',
  1012: 'Zynaptiq PitchMap',
  1013: 'MeldaProduction MeldwayGrand',
  1014: 'Native Instruments Kontakt 8',
  1015: 'Arturia V Collection 11 Pro',
  1016: 'XLN Audio Addictive Keys',
  1017: 'Native Instruments Noire',
  1018: 'Arturia Augmented GRAND PIANO',
  1019: 'IK Multimedia AmpliTube 5',
  1020: 'Two Notes Audio Engineering GENOME',
  1021: 'Universal Audio UAD Sound City Studios',
  1022: 'Kiive Audio Lunchbox Amp Sim',
  1023: 'Softube Amp Room Marshall Suite',
  1032: 'Celemony Melodyne 5 Essential',
  1035: 'Synchro Arts VocAlign 7 Pro',
  1036: 'Synchro Arts Revoice Pro 5',
  1040: 'Synchro Arts RePitch 2 Standard',
  1041: 'iZotope Nectar 4 Advanced'
};
Object.entries(renames).forEach(([id, t]) => {
  const p = products.find(x => x.id === Number(id));
  if (!p) { console.log(id + ' NO EXISTE'); process.exit(1); }
  p.title = t;
});
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('catalogo: 31 titulos OK');

const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
guides.find(x => x.id === 'best-synth-vsts').image = 'https://r2.gear4music.com/media/134/1340036/1200/preview.jpg';

const finalTitles = products.filter(p => p.id >= 29).map(p => p.title);
const extraProtect = [
  'RePitch 2 Standard + VocAlign 7 Pro Bundle',
  'RePitch 2 + VocAlign 7 Pro Bundle',
  'Bundle RePitch 2 + VocAlign 7 Pro'
];
const protect = [...new Set([...finalTitles, ...extraProtect])].sort((a, b) => b.length - a.length);
const maps = [
  ['Two Notes GENOME', renames[1020]],
  ['Vengeance Avenger 2', renames[1004]],
  ['VPS Avenger 2', renames[1004]],
  ['UA 1176', 'Universal Audio 1176'],
  ['TDR Kotelnikov GE', renames[61]],
  ['UAD Sound City Studios', renames[1021]],
  ['Amp Room Marshall Suite', renames[1023]],
  ['Amp Room: Marshall Suite', renames[1023]],
  ['Augmented Grand Piano', renames[1018]],
  ['Augmented GRAND PIANO', renames[1018]],
  ['V Collection 11', renames[1015]],
  ['Melodyne 5 Essential', renames[1032]],
  ['Nectar 4 Advanced', renames[1041]],
  ['VocAlign 7 Pro', renames[1035]],
  ['Revoice Pro 5', renames[1036]],
  ['Revoice Pro', renames[1036]],
  ['RePitch 2 Standard', renames[1040]],
  ['RePitch 2', renames[1040]],
  ['Lunchbox Amp Sim', renames[1022]],
  ['Addictive Keys', renames[1016]],
  ['Phase Plant', renames[1003]],
  ['Pigments 7', renames[1001]],
  ['MeldwayGrand', renames[1013]],
  ['AmpliTube 5', renames[1019]],
  ['REFERENCE 3', renames[474]],
  ['bx_clipper', renames[473]],
  ['Playbeat 4', renames[1010]],
  ['Riffer 4', renames[1011]],
  ['Kontakt 8', renames[1014]],
  ['PitchMap', renames[1012]],
  ['reMIDI 4', renames[1008]],
  ['Loop Engine 3', renames[1009]],
  ['Massive X', renames[1006]],
  ['GENOME', renames[1020]],
  ['Spire', renames[1005]],
  ['Noire', renames[1017]],
  ['Diva', renames[1002]]
].sort((a, b) => b[0].length - a[0].length);

let total = 0;
guides.forEach(g => {
  const metas = [];
  let s = JSON.stringify(g);
  s = s.replace(/"metaDesc(_es)?":"((?:[^"\\]|\\.)*)"/g, m => {
    metas.push(m);
    return '"metaDesc§§":"%%META' + (metas.length - 1) + '%%"';
  });
  protect.forEach((t, i) => { s = s.split(t).join('%%K' + i + '%%'); });
  let c = 0;
  maps.forEach(([bare, full]) => {
    const n = s.split(bare).length - 1;
    if (n > 0) { s = s.split(bare).join(full); c += n; }
  });
  protect.forEach((t, i) => { s = s.split('%%K' + i + '%%').join(t); });
  s = s.replace(/"metaDesc§§":"%%META(\d+)%%"/g, (m, i) => metas[Number(i)].replace('"metaDesc', '"metaDesc'));
  const g2 = JSON.parse(s);
  Object.keys(g).forEach(k => delete g[k]);
  Object.assign(g, g2);
  if (c > 0) { console.log(g.id + ': ' + c + ' reemplazos'); total += c; }
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('TOTAL: ' + total);
