const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const NP = ['Not published', 'No publicado'];

// ---------- 1. URL zzounds corregida ----------
const pj = BASE + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const p675 = arr.find(p => p.id === 675);
if (!p675) die('675 no existe');
p675.stores.zzounds = 'https://www.zzounds.com/item--SEEX1R?siid=133957';
fs.writeFileSync(pj, JSON.stringify(P, null, 2));
let src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const oldZz = 'https://www.zzounds.com/item--SEEX1SSTUDBUN?siid=227155';
if (!src.includes(oldZz)) die('URL zzounds vieja no encontrada en TEST');
src = src.split(oldZz).join('https://www.zzounds.com/item--SEEX1R?siid=133957');
fs.writeFileSync(BASE + 'build-guides.js', src);
try { new Function(fs.readFileSync(BASE + 'build-guides.js', 'utf8')); console.log('zzounds URL corregida en catalogo + TEST'); }
catch (err) { die('ROTO: ' + err.message); }

// ---------- 2. Tres filas nuevas (orden tabla: X1R, AT2020, LCT240, NT1Sig, NT15th, Origin, LCT440, SM7B, SM7dB, TLM102, C414) ----------
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'best-microphone');
const NCOL = g.productTable.columns.length;
if (NCOL !== 11) die('columnas inesperadas: ' + NCOL);
const fri = g.productTable.rows.findIndex(r => r.label === 'Frequency Response');
if (fri === -1) die('fila Frequency Response no encontrada');
if (g.productTable.rows.some(r => r.label === 'Max SPL')) die('filas ya existen');

const mk = (enVals, esVals) => {
  if (enVals.length !== 11 || esVals.length !== 11) die('valores != 11');
  return { values: enVals.map((v, k) => ({ value: v, value_es: esVals[k] })) };
};
const newRows = [
  { label: 'Max SPL', label_es: 'SPL máximo', ...mk(
    ['135 dB', '144 dB', '142 dB', '142 dB', '142 dB', '127 dB', '140 dB', NP[0], NP[0], '144 dB', '140 dB'],
    ['135 dB', '144 dB', '142 dB', '142 dB', '142 dB', '127 dB', '140 dB', NP[1], NP[1], '144 dB', '140 dB']) },
  { label: 'Self-Noise', label_es: 'Ruido propio', ...mk(
    ['23 dB', '20 dB', '19 dB-A', '4 dBA', '4 dBA', '18 dB-A', '7 dB-A', 'N/A (passive)', NP[0], '12 dB-A', '6 dB-A'],
    ['23 dB', '20 dB', '19 dB-A', '4 dBA', '4 dBA', '18 dB-A', '7 dB-A', 'N/A (pasivo)', NP[1], '12 dB-A', '6 dB-A']) },
  { label: 'Sensitivity', label_es: 'Sensibilidad', ...mk(
    ['1.8 mV/Pa', '14.1 mV/Pa', '16.7 mV/Pa', '25 mV/Pa', '25 mV/Pa', '23 mV/Pa', '27.4 mV/Pa', '1.1 mV/Pa', '1.1 mV/Pa + preamp', '11 mV/Pa', '23 mV/Pa'],
    ['1.8 mV/Pa', '14.1 mV/Pa', '16.7 mV/Pa', '25 mV/Pa', '25 mV/Pa', '23 mV/Pa', '27.4 mV/Pa', '1.1 mV/Pa', '1.1 mV/Pa + preamp', '11 mV/Pa', '23 mV/Pa']) },
];
g.productTable.rows.splice(fri + 1, 0, ...newRows);
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));

// ---------- VERIFICACION ----------
console.log('filas tabla:', g.productTable.rows.length);
console.log('orden filas:', g.productTable.rows.map(r => r.label).join(' | '));
const bad = g.productTable.rows.filter(r => r.values.length !== NCOL);
console.log('filas desalineadas:', bad.length);
const labels = g.productTable.rows.map(r => r.label);
console.log('labels unicos:', new Set(labels).size === labels.length);
