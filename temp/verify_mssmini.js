const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/compact-rhythm-devices.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['708998/1200/preview.jpg', 'ELKMODELSAMPLES', 'SYN0006852', '306', '299', '869287-1f6a86cc651c318e9ccc527e28e3aaab', 'PLYTRACKERMINI', '799'].forEach(n => ck(h.includes(n), 'has ' + n));
process.exit(bad ? 1 : 0);
