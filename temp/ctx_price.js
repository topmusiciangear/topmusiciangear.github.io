const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-pa-speakers.html', 'utf8');
const n = (d.match(/data-price=/g) || []).length;
console.log('data-price= : ' + n);
let i = -1, c = 0;
while ((i = d.indexOf('data-price=', i + 1)) > -1 && c < 4) {
  console.log('\n--- contexto ' + (++c) + ' ---');
  console.log(d.slice(Math.max(0, i - 320), i + 260).replace(/\s+/g, ' '));
}
console.log('\n\n--- el desplegable de una tarjeta (musicstore) ---');
const ms = d.indexOf('data-store="musicstore"');
console.log(d.slice(ms, ms + 1900).replace(/\s+/g, ' ').slice(0, 1500));