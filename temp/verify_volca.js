const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/compact-rhythm-devices.html', 'utf8');
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['885626/1200/preview.jpg', '119', '124', 'KORVOLCASAMPLE2', '3JY6'].forEach(n => ck(h.includes(n), 'has ' + n));
process.exit(bad ? 1 : 0);
