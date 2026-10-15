// Anade zZounds al Sony MDR-7506 (id 26). La pagina real dice
// "No longer available at zZounds", asi que va en oos y SIN precio.
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ── 1. products.json: URL de zZounds ──
const pf = BASE + 'data/products.json';
const arr = JSON.parse(fs.readFileSync(pf, 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const p = list.find(x => x.id === 26);
if (!p) { console.log('producto 26 no encontrado'); process.exit(1); }
p.stores.zzounds = 'https://www.zzounds.com/item--SNYMDR7506';
fs.writeFileSync(pf, JSON.stringify(Array.isArray(arr) ? list : arr, null, 2), 'utf8');
console.log('products.json: zzounds anadido a id 26 (' + p.title + ')');

// ── 2. build-guides.js: entrada 26 pasa a multilinea con oos:["zzounds"] ──
const bf = BASE + 'build-guides.js';
let s = fs.readFileSync(bf, 'utf8');
const vieja = '  26: {prices:{amazon:"$113.00",gear4music:"£85.00",musicstore:"€89.00"}},';
const nueva = [
  '  26: {',
  '    prices: { amazon: "$113.00", gear4music: "£85.00", musicstore: "€89.00" },',
  '    oos: ["zzounds"]',
  '  },'
].join('\n');
if (s.indexOf(vieja) < 0) { console.log('NO se encontro la entrada 26 en formato compacto'); process.exit(1); }
s = s.replace(vieja, nueva);
fs.writeFileSync(bf, s, 'utf8');
console.log('build-guides.js: entrada 26 con oos:["zzounds"] (sin precio, no hay)');

try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SYNTAXIS ROTA: ' + e.message); }
