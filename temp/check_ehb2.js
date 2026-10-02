const fs = require('fs');
const b = fs.readFileSync('guides/best-bass-home-office.html', 'utf8');
const i = b.indexOf('Ibanez EHB1000 Headless Bass');
const slice = b.slice(i, i + 6000);
const prices = [...slice.matchAll(/(€|\$|£)[\d,.]+/g)].map(m => m[0]);
console.log('precios en card EHB: ' + [...new Set(prices)].join(' | '));
const d = slice.indexOf('data-store="gear4music"');
console.log('fila g4m: ' + slice.slice(d, d + 400).replace(/\s+/g, ' ').slice(0, 300));
