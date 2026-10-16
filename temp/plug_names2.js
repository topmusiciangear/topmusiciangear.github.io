const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
guides.find(x => x.id === 'best-synth-vsts').image = 'https://r2.gear4music.com/media/134/1340036/1200/preview.jpg';

const T = id => products.find(p => p.id === id).title;
const pairs = [
  ['Two Notes GENOME', T(1020)],
  ['Vengeance Avenger 2', T(1004)],
  ['VPS Avenger 2', T(1004)],
  ['UA 1176', 'Universal Audio 1176'],
  ['TDR Kotelnikov GE', T(61)],
  ['UAD Sound City Studios', T(1021)],
  ['Amp Room Marshall Suite', T(1023)],
  ['Amp Room: Marshall Suite', T(1023)],
  ['Augmented Grand Piano', T(1018)],
  ['Augmented GRAND PIANO', T(1018)],
  ['V Collection 11', T(1015)],
  ['Melodyne 5 Essential', T(1032)],
  ['Nectar 4 Advanced', T(1041)],
  ['VocAlign 7 Pro', T(1035)],
  ['Revoice Pro 5', T(1036)],
  ['Revoice Pro', T(1036)],
  ['RePitch 2 Standard', T(1040)],
  ['RePitch 2', T(1040)],
  ['Lunchbox Amp Sim', T(1022)],
  ['Addictive Keys', T(1016)],
  ['Phase Plant', T(1003)],
  ['Pigments 7', T(1001)],
  ['MeldwayGrand', T(1013)],
  ['AmpliTube 5', T(1019)],
  ['REFERENCE 3', T(474)],
  ['bx_clipper', T(473)],
  ['Playbeat 4', T(1010)],
  ['Riffer 4', T(1011)],
  ['Kontakt 8', T(1014)],
  ['PitchMap', T(1012)],
  ['reMIDI 4', T(1008)],
  ['Loop Engine 3', T(1009)],
  ['Massive X', T(1006)],
  ['GENOME', T(1020)],
  ['Spire', T(1005)],
  ['Noire', T(1017)],
  ['Diva', T(1002)]
];
const identity = new Set([
  ...products.filter(p => p.id >= 29).map(p => p.title),
  'RePitch 2 Standard + VocAlign 7 Pro Bundle',
  'RePitch 2 + VocAlign 7 Pro Bundle',
  'Bundle RePitch 2 + VocAlign 7 Pro'
]);
const branches = [...identity].map(t => ({ t, rep: t }));
pairs.forEach(([bare, full]) => branches.push({ t: bare, rep: full }));
branches.sort((a, b) => b.t.length - a.t.length);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rx = new RegExp(branches.map(b => esc(b.t)).join('|'), 'g');
const repOf = {};
branches.forEach(b => { if (!(b.t in repOf)) repOf[b.t] = b.rep; });

let total = 0;
guides.forEach(g => {
  const metas = [];
  let s = JSON.stringify(g);
  s = s.replace(/"metaDesc(_es)?":"((?:[^"\\]|\\.)*)"/g, m => {
    metas.push(m);
    return '"metaDesc§§":"%%META' + (metas.length - 1) + '%%"';
  });
  let c = 0;
  s = s.replace(rx, m => {
    const r = repOf[m];
    if (r !== m) c++;
    return r;
  });
  s = s.replace(/"metaDesc§§":"%%META(\d+)%%"/g, (m, i) => metas[Number(i)]);
  const g2 = JSON.parse(s);
  Object.keys(g).forEach(k => delete g[k]);
  Object.assign(g, g2);
  if (c > 0) { console.log(g.id + ': ' + c + ' reemplazos'); total += c; }
});
const rp = guides.find(x => x.id === 'repitch-vs-melodyne');
rp.productTable.title = 'Synchro Arts RePitch 2 Standard vs Celemony Melodyne 5 Essential Compared';
rp.productTable.title_es = 'Synchro Arts RePitch 2 Standard vs Celemony Melodyne 5 Essential comparados';
const va = guides.find(x => x.id === 'vocalign-vs-revoice-pro');
va.productTable.title = 'Synchro Arts VocAlign 7 Pro vs Synchro Arts Revoice Pro 5 Compared';
va.productTable.title_es = 'Comparativa Synchro Arts VocAlign 7 Pro vs Synchro Arts Revoice Pro 5';
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('TOTAL: ' + total);
