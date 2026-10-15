const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const x = p.find(y => y.id === 170);
console.log('=== 170 en catalogo ===');
console.log(JSON.stringify(x, null, 1));

const src = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + src.slice(ini + 'const TEST_SHOP_BTN = '.length, src.indexOf('\n};', ini) + 2))();
console.log('\nTEST_SHOP_BTN[170]: ' + JSON.stringify(mapa[170]));

// JSON-LD del 170 en la pagina generada
const d = fs.readFileSync(B + 'guides/starter-studio.html', 'utf8');
const idx = d.indexOf('TMG-ACCESSORIES-170');
console.log('\n=== JSON-LD del 170 (fragmento) ===');
console.log(d.slice(Math.max(0, idx - 1500), idx + 500).replace(/\s+/g, ' ').slice(0, 1200));
