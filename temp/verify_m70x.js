const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
const en = fs.readFileSync(DIR + 'guides/tracking-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/tracking-headphones_es.html', 'utf8');
ck(en.includes('ATH-M70x') && es.includes('ATH-M70x'), 'M70x EN+ES');
ck(!/HD 620S|620S/.test(en + es), 'no 620S left');
ck(en.includes('eleven headphones') && es.includes('once auriculares'), 'eleven kept');
const sb = fs.readFileSync(DIR + 'js/shop-buttons.js', 'utf8');
ck(sb.includes('608: {') && !sb.includes('607: {'), 'map 608 only');
ck(sb.includes('252.00') && sb.includes('253.00'), 'map M70x prices');
const P = JSON.parse(fs.readFileSync(DIR + 'data/products.json', 'utf8'));
ck(!P.some(p => p.id === 607) && P.some(p => p.id === 608), 'catalog 608 only');
process.exit(bad ? 1 : 0);
