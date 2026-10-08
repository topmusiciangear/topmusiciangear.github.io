const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
const en = fs.readFileSync(DIR + 'guides/tracking-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/tracking-headphones_es.html', 'utf8');
ck(en.includes('HD 620S') && es.includes('HD 620S'), 'HD620S EN+ES');
ck(en.includes('eleven headphones') && es.includes('once auriculares'), 'eleven count');
ck(!/ten headphones|diez auriculares/.test(en + es), 'no ten left');
ck(en.includes('51w2J0eEbKL'), 'amazon img');
const sb = fs.readFileSync(DIR + 'js/shop-buttons.js', 'utf8');
ck(sb.includes('"269.99"') || sb.includes('$269.99'), 'map 269.99');
process.exit(bad ? 1 : 0);
