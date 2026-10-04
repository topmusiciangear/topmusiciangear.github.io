const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces_es.html', 'utf8');
const i = h.indexOf('Ultra-Compacta');
const before = h.slice(Math.max(0, i - 1200), i);
const m = before.match(/<table[^>]*>/g);
console.log('tables before:', m);
console.log('context:', before.slice(-400));