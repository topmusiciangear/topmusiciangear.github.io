const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/guitar-bass-amps.html', 'utf8');
const t = h.indexOf('Mustang GTX100');
const region = h.slice(t, t + 15000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['643017/1200/preview.jpg', '549', '569', '499', '619', 'FEN2310700', 'mustang-gtx100-modelling-combo-amp', 'GIT0052219'].forEach(n => ck(region.includes(n), 'GTX region has ' + n));
process.exit(bad ? 1 : 0);
