// 1) QUITAR de tabla y veredictos los productos que no existen
// 2) NORMALIZAR los nombres de tabla/veredicto al nombre actual del catalogo
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(f, 'utf8'));
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;

const g = id => guides.find(x => x.id === id);

// ---- 1. QUITAR COLUMNAS DE PRODUCTO INEXISTENTE ----
const QUITAR = [
  ['best-reverb-delay', 'Chase Bliss Habit'],
  ['best-looper-pedals', 'Headrush Looperboard'],
];
QUITAR.forEach(([gid, nombre]) => {
  const gu = g(gid);
  const pt = gu.productTable;
  const i = pt.columns.findIndex(c => c.title === nombre);
  if (i < 0) { console.log('!! ' + gid + ': no existe la columna "' + nombre + '"'); return; }
  // quitar la celda i de cada fila
  pt.rows.forEach(r => { if (Array.isArray(r) && r.length > i) r.splice(i, 1); });
  pt.columns.splice(i, 1);
  console.log('QUITADO columna "' + nombre + '" de ' + gid + '  -> ' + pt.columns.length + ' columnas');
  // quitar el veredicto
  const vi = gu.verdictProsCons.findIndex(v => (v.name || v.title) === nombre);
  if (vi > -1) { const v = gu.verdictProsCons.splice(vi, 1)[0]; console.log('   quitado tambien su veredicto (' + (v.pros ? v.pros.length : 0) + ' pros / ' + (v.cons ? v.cons.length : 0) + ' contras)'); }
  else console.log('   no tinha veredicto con ese nombre');
});

// ---- 2. RENOMBRAR para que coincidan con el catalogo ----
const RENOMBRAR = [
  ['best-reverb-delay', 'Boss DD-8 digital Delay', 'Boss DD-8 Digital Delay'],
  ['best-reverb-delay', 'UA Del-Verb', 'Universal Audio Del-Verb'],
  ['best-reverb-delay', 'UA Golden Reverberator', 'Universal Audio Golden Reverberator'],
  ['best-looper-pedals', 'TC Electronic Ditto X4', 'TC Electronic Ditto X4 Looper'],
  ['best-wireless-iems', 'PSM 300', 'Shure PSM300'],
  ['best-wireless-iems', 'Shure PSM 300 Twin Pack Pro', 'Shure PSM300'],
  ['best-wireless-iems', 'Sennheiser EW IEM G4-TWIN', 'Sennheiser ew IEM G4-TWIN-E'],
  ['stream-controllers', 'Rode RODECaster Pro II', 'RØDE RØDECaster Pro II'],
  ['mixing-plugins', 'Mastering The Mix REFERENCE 3', 'REFERENCE 3'],
  ['best-acoustic-guitars-for-beginners', 'Yamaha FS800 Acoustic', 'Yamaha FS800'],
  ['best-drum-machine', 'Erica Synths Pērkons HD-01', 'Erica Synths Perkons HD-01'],
  ['best-multi-effects-pedals', 'Boss GT-1000 Core', 'Boss GT-1000CORE'],
];
RENOMBRAR.forEach(([gid, viejo, nuevo]) => {
  const gu = g(gid);
  let n = 0;
  if (gu.productTable) gu.productTable.columns.forEach(c => { if (c.title === viejo) { c.title = nuevo; n++; } });
  (gu.verdictProsCons || []).forEach(v => { if ((v.name || v.title) === viejo) { v.name = nuevo; if (v.title !== undefined) v.title = nuevo; n++; } });
  console.log((n ? 'RENOMBRADO' : '!! no encontrado') + ' en ' + gid + ': "' + viejo + '" -> "' + nuevo + '" (' + n + ')');
});

// ---- verificacion: cada columna debe existir en el catalogo ----
const titles = new Set(arr.map(p => p.title));
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const IGN = ['the','a','an','and','with','for','of','in','pro','plus','series','each','set','pair','mkii','mk','iii','ii','gen','version','power','powered','speaker','microphone','mic','digital','usb','xlr','guitar','bass','pedal','keyboard','audio','studio','wireless','system','interface','monitor','headphones','synth','synthesizer','sampler','drum','mixer','amplifier','plugin','bundle','edition','complete','black','white','model','original','classic','pack','condenser','shotgun','dynamic','cardioid','vocal','kit','zone','core','evo','reference','premium','standard','best','twin','stereo'];
const key = s => norm(s).split(' ').filter(w => w.length > 1 && IGN.indexOf(w) < 0);
function existe(nombre) {
  if (titles.has(nombre)) return true;
  const k = key(nombre);
  return arr.some(p => { const kp = key(p.title); let i = -1; for (const w of k) { i = kp.indexOf(w, i + 1); if (i < 0) return false; } return true; });
}
console.log('\n--- verificacion post-cambio ---');
let malas = 0;
guides.forEach(gu => {
  if (!gu.productTable) return;
  gu.productTable.columns.forEach(c => { if (!existe(c.title)) { malas++; console.log('   !! ' + gu.id + ': "' + c.title + '" sigue sin existir'); } });
  (gu.verdictProsCons || []).forEach(v => { const n = v.name || v.title; if (n && !existe(n)) { malas++; console.log('   !! ' + gu.id + ' (veredicto): "' + n + '" sigue sin existir'); } });
});
console.log('nombres que siguen sin resolver: ' + malas);

if (malas === 0) {
  fs.writeFileSync(f, JSON.stringify(guides, null, 2), 'utf8');
  console.log('\nguides.json escrito');
} else console.log('\nNO se escribe');