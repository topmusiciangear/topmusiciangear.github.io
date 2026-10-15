// Plantilla: como esta registrado el KRK Rokit 7 G5 (id 20) y su entrada en el mapa
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

const p = list.find(x => x.id === 20);
console.log('=== id 20 (PLANTILLA) ===');
console.log(JSON.stringify(p, null, 1));

// ¿existe ya un Rokit 5?
console.log('\n=== ¿hay ya un Rokit 5 en el catalogo? ===');
list.filter(x => /rokit/i.test(x.title)).forEach(x => console.log('  id ' + x.id + '  ' + x.title + '  $' + x.price));

// max id para el nuevo
const max = Math.max(...list.map(x => x.id));
console.log('\n  id maximo actual: ' + max);

// entrada del mapa del 20
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
const m = /(?:^|\n)(\s*)20:\s*\{/.exec(bloque);
const i0 = m.index + m[1].length;
console.log('\n=== entrada 20 en TEST_SHOP_BTN ===');
console.log(bloque.slice(i0, emp(bloque, i0 + (m[0].length - m[1].length) - 1) + 1).replace(/\s+/g, ' '));
