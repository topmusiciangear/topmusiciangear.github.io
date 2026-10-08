const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/compact-rhythm-devices.html', 'utf8');
const t = h.indexOf('SEQTRAK');
const region = h.slice(t, t + 15000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['1035415/1200/preview.jpg', '445', '299', 'YAMSEQTRAK', 'SYN0008890', '66QJ'].forEach(n => ck(region.includes(n), 'SEQTRAK has ' + n));
process.exit(bad ? 1 : 0);
