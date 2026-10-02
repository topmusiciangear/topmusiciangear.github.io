const fs = require('fs');
const b = fs.readFileSync('guides/best-bass-home-office.html', 'utf8');
const rows = ['andertons', 'musicstore', 'amazon', 'zzounds', 'gear4music'];
console.log('filas EHB por tienda:');
rows.forEach(st => {
  const re = new RegExp('data-store="' + st + '"[^>]*>.*?(€[\\d,.]+|\\$[\\d,.]+|£[\\d,.]+|Agotado|Not Available)', 's');
  const secs = b.split('Ibanez EHB1000');
  console.log(' ' + st + ': ' + (b.includes('data-store="' + st + '"') ? 'presente' : 'AUSENTE'));
});
['£899.00', '€1,159.00', '$1,300.00', '$1299.99', '1033527'].forEach(t => console.log((b.includes(t) ? 'OK  ' : 'FALTA') + ' ' + t));
console.log('og:image: ' + (b.match(/og:image[^>]*content="([^"]+)"/) || ['', '?'])[1].slice(0, 80));
