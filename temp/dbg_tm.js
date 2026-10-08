const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/guitar-bass-amps.html', 'utf8');
// find TM product card (has photo) and check surrounding 25k chars
const i = h.indexOf('674966/1200/preview.jpg');
console.log('photo at', i);
const region = h.slice(Math.max(0, i - 5000), i + 25000);
['1,079', '1,199', '1,219', 'FEN2274100'].forEach(n => console.log(n, region.includes(n)));
