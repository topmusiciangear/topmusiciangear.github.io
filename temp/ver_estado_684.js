const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const x = p.find(y => y.id === 684);
console.log('=== 684 en products.json ===');
console.log(JSON.stringify(x, null, 1));

const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const cuerpo = s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2);
const mapa = new Function('return ' + cuerpo)();
console.log('\n=== 684 en TEST_SHOP_BTN ===');
console.log(JSON.stringify(mapa[684], null, 1));
