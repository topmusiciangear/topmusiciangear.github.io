// Añadir Amazon al KRK Rokit 5 G5 (id 633). URL y PRECIO juntos (regla del sitio).
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// verificado: amazon.com/KRK-Generation-Powered-Studio-Monitor/dp/B0CW16KG33 -> $199.00 (1x5")
const ASIN = 'B0CW16KG33';
const URL_AMZ = 'https://www.amazon.com/dp/' + ASIN;
const PRECIO_AMZ = '$199.00';

// ── products.json ──
const PF = BASE + 'data/products.json';
const arr = JSON.parse(fs.readFileSync(PF, 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const p = list.find(x => x.id === 633);
if (!p.stores.amazon) { p.stores.amazon = URL_AMZ; console.log('products.json: amazon añadido a id 633'); }
else console.log('products.json: ya tenia amazon');
fs.writeFileSync(PF, JSON.stringify(Array.isArray(arr) ? list : arr, null, 2) + '\n', 'utf8');

// ── TEST_SHOP_BTN ──
const BF = BASE + 'build-guides.js';
let s = fs.readFileSync(BF, 'utf8');
const antes = '633: { prices: { gear4music: "£141.00", zzounds: "$199.00", musicstore: "€195.00" }';
const despues = '633: { prices: { amazon: "' + PRECIO_AMZ + '", gear4music: "£141.00", zzounds: "$199.00", musicstore: "€195.00" }';
if (s.indexOf(antes) > -1) {
  s = s.replace(antes, despues);
  fs.writeFileSync(BF, s, 'utf8');
  console.log('build-guides.js: precio amazon añadido a la entrada 633');
} else {
  console.log('build-guides.js: PATRON NO ENCONTRADO — hay que editarlo a mano');
}
console.log('euros: ' + (s.match(/€/g) || []).length + ' | mojibake: ' + (s.match(/â‚¬|Â£|Â°/g) || []).length);
try { new Function(s); console.log('sintaxis: OK'); } catch (e) { console.log('SINTAXIS ROTA'); }

// resumen de lo que tiene el producto ahora
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const bloque = s.slice(ini, s.indexOf('\n};', ini));
const m = /(?:^|\n)(\s*)633:\s*\{/.exec(bloque);
let d = 0, i = m.index + m[1].length;
for (let j = i; j < bloque.length; j++) { if (bloque[j] === '{') d++; else if (bloque[j] === '}') { d--; if (!d) { i = j; break; } } }
console.log('\n633 ahora: ' + bloque.slice(m.index + m[1].length, i + 1).replace(/\s+/g, ' '));
