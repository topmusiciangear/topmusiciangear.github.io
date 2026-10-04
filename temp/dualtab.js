const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces.html', 'utf8');
const tables = [...h.matchAll(/<table class="guide-comp-table"[^>]*>([\s\S]{0,400})/g)];
console.log('tablas:', tables.length);
tables.forEach((m, i) => {
  const ths = [...m[1].matchAll(/<th>([^<]*)<\/th>/g)].map(x => x[1]);
  console.log('TABLA' + i + ' headers:', ths.join(' | '));
});
// titles
[...h.matchAll(/guide-comp-title">([^<]+)</g)].forEach(m => console.log('TITULO:', m[1]));