const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-samplers-drum-computers.html', 'utf8');
const t = h.indexOf('SP-404MKII');
const region = h.slice(t, t + 15000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['499', '473'].forEach(n => ck(region.includes(n), 'SP has ' + n));
process.exit(bad ? 1 : 0);
