const fs = require('fs');
const b = fs.readFileSync('guides/best-5-string-basses.html', 'utf8');
const dps = ['B0D2LQY6PS', 'B00HWIRU1A', 'B07BBWRZSK', 'B00GEC02FG', 'B091BH8F34', 'B07MLJL7CZ', 'B07N29M92D', 'B08L331Q8G', 'B0CSKD5KGL', 'B083QV2CZQ'];
dps.forEach(a => console.log((b.includes(a) ? 'OK  ' : 'FALTA') + ' ' + a));
const amz = (b.match(/data-store="amazon"/g) || []).length;
console.log('filas amazon en pagina: ' + amz);
