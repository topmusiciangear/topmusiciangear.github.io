const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));

const SYNC = [
  ['best-reverb-delay', 'Universal Audio Del-Verb', 'UA Del-Verb', 'Universal Audio Del-Verb'],
  ['best-reverb-delay', 'Universal Audio Golden Reverberator', 'UA Golden Reverberator', 'Universal Audio Golden Reverberator'],
  ['best-looper-pedals', 'TC Electronic Ditto X4 Looper', 'TC Electronic Ditto X4', 'TC Electronic Ditto X4 Looper'],
  ['best-wireless-iems', 'Shure PSM300', 'PSM 300', 'Shure PSM300'],
  ['stream-controllers', 'RØDE RØDECaster Pro II', 'Rode RODECaster Pro II', 'RØDE RØDECaster Pro II'],
  ['mixing-plugins', 'REFERENCE 3', 'Mastering The Mix REFERENCE 3', 'REFERENCE 3'],
  ['best-drum-machine', 'Erica Synths Perkons HD-01', 'Erica Synths Pērkons HD-01', 'Erica Synths Perkons HD-01'],
  ['best-multi-effects-pedals', 'Boss GT-1000CORE', 'Boss GT-1000 Core', 'Boss GT-1000CORE'],
];
let n = 0;
SYNC.forEach(([gid, tituloEN, viejoES, nuevoES]) => {
  const g = guides.find(x => x.id === gid);
  if (!g.productTable) { console.log('!! ' + gid + ' sin tabla'); return; }
  const col = g.productTable.columns.find(c => c.title === tituloEN);
  if (!col) { console.log('!! ' + gid + ': no encuentro la columna "' + tituloEN + '"'); return; }
  if (col.title_es !== viejoES) { console.log('   ' + gid + ': title_es ya es "' + col.title_es + '" (esperaba "' + viejoES + '")'); return; }
  col.title_es = nuevoES; n++;
  console.log('OK  ' + gid + ': title_es "' + viejoES + '" -> "' + nuevoES + '"');
});
fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8');
console.log('\ntitle_es sincronizados: ' + n);

// verificacion final: EN y ES de cada columna deben existir en el catalogo
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const titles = new Set(arr.map(p => p.title));
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
function existe(nombre) {
  if (titles.has(nombre)) return true;
  const k = key(nombre);
  return arr.some(p => { const kp = key(p.title); let i = -1; for (const w of k) { i = kp.indexOf(w, i + 1); if (i < 0) return false; } return true; });
}
let malas = 0;
guides.forEach(g => {
  if (!g.productTable) return;
  g.productTable.columns.forEach(c => {
    if (!existe(c.title)) { malas++; console.log('   !! EN ' + g.id + ': "' + c.title + '"'); }
    if (!existe(c.title_es)) { malas++; console.log('   !! ES ' + g.id + ': "' + c.title_es + '"'); }
  });
});
console.log('columnas que aun no resuelven: ' + malas);