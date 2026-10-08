const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const en = fs.readFileSync(DIR + 'guides/tracking-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/tracking-headphones_es.html', 'utf8');
const ben = fs.readFileSync(DIR + 'guides/budget-headphones.html', 'utf8');
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
ck(en.includes('ATH-M40x') && en.includes('NDH 20'), 'tracking EN has both');
ck(es.includes('ATH-M40x') && es.includes('NDH 20'), 'tracking ES has both');
ck(en.includes('nine headphones'), 'tracking EN nine');
ck(es.includes('nueve auriculares'), 'tracking ES nueve');
ck(!en.includes('seven headphones') && !es.includes('siete auriculares'), 'no seven left');
ck(ben.includes('HD 280') && !ben.includes('605'), 'budget HD280 ok');
// 419 kept, 605 = NDH20 in map
const sb = fs.readFileSync(DIR + 'js/shop-buttons.js', 'utf8');
ck(sb.includes('NEUNDH20') && sb.includes('$549.00'), 'map NDH20');
ck(sb.includes('SENHD280PRO'), 'map HD280 stores');
process.exit(bad ? 1 : 0);
