const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
const t = h.indexOf('Perkons');
const region = h.slice(t, t + 12000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
ck(region.includes('1103693/1200/preview.jpg'), 'new photo');
ck(region.includes('1,965'), 'MS 1965');
process.exit(bad ? 1 : 0);
