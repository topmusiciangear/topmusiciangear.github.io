// Eris Studio 5 (684): precios actualizados + zZounds anadido (SI lo vendia)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// ── 1) products.json: alta de zZounds ──
const F = BASE + 'data/products.json';
const p = JSON.parse(fs.readFileSync(F, 'utf8'));
const x = p.find(y => y.id === 684);
if (!x) { console.log('NO EXISTE 684'); process.exit(1); }

// sin el siid: es un parametro de sesion personal, no del producto
x.stores.zzounds = 'https://www.zzounds.com/item--PRSERISSTUDIO5';
console.log('=== stores del 684 ===');
Object.entries(x.stores).forEach(([k, v]) => console.log('  ' + k.padEnd(12) + v.slice(0, 95)));
fs.writeFileSync(F, JSON.stringify(p, null, 2) + '\n', 'utf8');

// ── 2) TEST_SHOP_BTN: precios + quitar el na de zZounds ──
const B = BASE + 'build-guides.js';
let s = fs.readFileSync(B, 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);

const re = /(?:^|\n)(\s*)684:\s*\{/;
const m = re.exec(bloque);
if (!m) { console.log('no encontrada la entrada 684'); process.exit(1); }
const i0 = m.index + m[1].length;
let d = 0, fin = i0;
for (let j = i0; j < bloque.length; j++) { if (bloque[j] === '{') d++; else if (bloque[j] === '}') { d--; if (!d) { fin = j; break; } } }

console.log('\n=== TEST_SHOP_BTN 684 ===');
console.log('  ANTES  : ' + bloque.slice(i0, fin + 1).trim());

const NUEVA = '684: {\n' +
  '    prices: { amazon: "$149.99", gear4music: "\u00A3115.00", andertons: "\u00A3105.00", zzounds: "$149.99", musicstore: "\u20AC138.00" }\n' +
  '  }';
const antes = bloque.slice(i0, fin + 1);
const sangria = m[1];
const conSangria = NUEVA.split('\n').map(l => l.trim() ? sangria + l : l).join('\n');
bloque = bloque.slice(0, i0) + conSangria + bloque.slice(fin + 1);
console.log('  AHORA  :\n' + conSangria);

s = s.slice(0, ini) + bloque + s.slice(finBloque);
fs.writeFileSync(B, s, 'utf8');

console.log('\nmojibake build-guides.js: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SINTAXIS ROTA: ' + e.message); process.exit(1); }

// ── 3) control ──
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();
console.log('\n=== CONTROL ===');
console.log('  cfg[684]: ' + JSON.stringify(mapa[684]));
console.log('  na eliminado: ' + (!mapa[684].na ? 'si' : 'NO, sigue: ' + JSON.stringify(mapa[684].na)));
console.log('  tiendas con precio: ' + Object.keys(mapa[684].prices).length);
const p2 = JSON.parse(fs.readFileSync(F, 'utf8'));
console.log('  684.stores: ' + Object.keys(p2.find(y => y.id === 684).stores).join(', '));
console.log('  mojibake products.json: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
