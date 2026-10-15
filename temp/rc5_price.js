const fs = require('fs');
const b = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const m = b.match(/^\s*200:\s*\{[\s\S]*?\},\s*$/m);
console.log('=== TEST_SHOP_BTN entrada 200 ===');
console.log(m ? m[0].trim() : 'NO ENCONTRADA');
console.log('\n=== context: entradas vecinas ===');
const idx = b.indexOf('\n    200:');
console.log(idx > -1 ? b.slice(idx, idx + 320) : 'no');