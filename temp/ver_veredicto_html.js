const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-monitors-for-small-rooms_es.html', 'utf8');
const i = d.indexOf('<div class="verdict-product-name">PreSonus Eris Studio 5</div>');
const fin = d.indexOf('verdict-product-name', i + 50);
const b = d.slice(i, fin > -1 ? fin : i + 9000);
console.log('longitud del bloque: ' + b.length);
console.log('<li> totales: ' + (b.match(/<li>/g) || []).length);
console.log('\n--- estructura ---');
console.log(b.replace(/style="[^"]*"/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '[svg]').slice(0, 2400));
