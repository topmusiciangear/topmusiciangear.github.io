const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
const en = fs.readFileSync(DIR + 'guides/best-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/best-headphones_es.html', 'utf8');
ck(en.includes('HD 600') && es.includes('HD 600'), 'HD600 EN+ES');
ck(en.includes('Flat Since 1997') && es.includes('Plano desde 1997'), 'unique headings');
ck(!/ATH-R70x|HD 560S/.test(en + es), 'no R70x/560S added');
process.exit(bad ? 1 : 0);
