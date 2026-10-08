const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
const en = fs.readFileSync(DIR + 'guides/best-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/best-headphones_es.html', 'utf8');
['ATH-M20x', 'SR850', 'R70xa', 'NDH 30', 'LCD-X'].forEach(n => {
  ck(en.includes(n) && es.includes(n), n + ' EN+ES');
});
ck((en.match(/<th>/g) || []).length >= 12, 'table cols EN');
process.exit(bad ? 1 : 0);
