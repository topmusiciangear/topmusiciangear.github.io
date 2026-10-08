const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/compact-rhythm-devices.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['894404/1200/preview.jpg', '229', '319', '5AR3', 'SYN0008472', '927463/1200/preview.jpg', '5K7D'].forEach(n => ck(h.includes(n), 'has ' + n));
// andertons row for Lofi-12 must be white (price, no oos)
const t = h.indexOf('Lofi-12');
const region = h.slice(t, t + 15000);
const aRow = region.indexOf('Andertons');
ck(!/Out of stock|Agotado/i.test(region.slice(Math.max(0, aRow - 200), aRow + 500)), 'lofi andertons white');
process.exit(bad ? 1 : 0);
