const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const IDS = [220, 221, 223, 224, 327, 514, 516, 665, 667, 668, 669];

const deals = JSON.parse(fs.readFileSync(B + 'data/deals.json', 'utf8'));
console.log('ofertas del 665: ' + deals.filter(d => d.product_id === 665).length + ' de ' + deals.length);

const ph = JSON.parse(fs.readFileSync(B + 'data/price-history.json', 'utf8'));
console.log('price-history: ' + (Array.isArray(ph) ? 'array' : 'objeto con ' + Object.keys(ph).length + ' claves'));
const phKeys = Array.isArray(ph) ? [] : Object.keys(ph);
console.log('claves de huerfanos en history: ' + phKeys.filter(k => IDS.includes(Number(k))).join(', '));
const una = phKeys.find(k => IDS.includes(Number(k)));
if (una) console.log('ejemplo [' + una + ']: ' + JSON.stringify(ph[una]).slice(0, 200));
