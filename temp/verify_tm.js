const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/guitar-bass-amps.html', 'utf8');
const t = h.indexOf('Tone Master Deluxe Reverb');
const region = h.slice(t, t + 15000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['674966/1200/preview.jpg', '1,079', '1,199', '1,219', 'FEN2274100', 'tone-master-deluxe-reverb-1x12', 'GIT0050563'].forEach(n => ck(region.includes(n), 'TM region has ' + n));
process.exit(bad ? 1 : 0);
