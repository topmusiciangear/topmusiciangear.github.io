const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
let bad = 0;
function ck(c, n) { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; }
const en = fs.readFileSync(DIR + 'guides/tracking-headphones.html', 'utf8');
const es = fs.readFileSync(DIR + 'guides/tracking-headphones_es.html', 'utf8');
ck(en.includes('HD 300 Pro') && es.includes('HD 300 Pro'), 'HD300 EN+ES');
ck(en.includes('ten headphones') && es.includes('diez auriculares'), 'ten count');
ck(!/nine headphones|nueve auriculares/.test(en + es), 'no nine left');
const sb = fs.readFileSync(DIR + 'js/shop-buttons.js', 'utf8');
ck(sb.includes('"£148.50"') && sb.includes('"£145.00"'), 'map HD300 G4M+Andertons');
ck(sb.includes('"€479.00"'), 'map NDH20 MS 479');
process.exit(bad ? 1 : 0);
