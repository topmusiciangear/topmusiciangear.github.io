const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const p = list.find(x => x.id === 633);

console.log('=== id 633 · KRK Rokit 5 G5 ===');
console.log(JSON.stringify(p, null, 1));

// entrada en el mapa
const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
const m = /(?:^|\n)(\s*)633:\s*\{/.exec(bloque);
console.log('\n=== entrada 633 en TEST_SHOP_BTN ===');
console.log(m ? bloque.slice(m.index + m[1].length, emp(bloque, m.index + m[1].length + (m[0].length - m[1].length) - 1) + 1).replace(/\s+/g, ' ') : '(NO TIENE ENTRADA -> sin precios)');

// en que guias sale ya
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
console.log('\n=== en que guias aparece el 633 ===');
g.forEach(x => {
  const enSec = (x.sections || []).some(s => (s.products || []).includes(633));
  const enVer = (x.verdictProsCons || []).some(v => v.productId === 633);
  if (enSec || enVer) console.log('  ' + x.id + (enSec ? ' [tarjeta]' : '') + (enVer ? ' [veredicto]' : ''));
});
console.log('  (si no aparece, solo esta en el catalogo)');
