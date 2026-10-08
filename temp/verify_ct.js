const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-drum-machine.html', 'utf8');
const t = h.indexOf('Circuit Tracks');
const region = h.slice(t, t + 12000);
let bad = 0;
const ck = (c, n) => { console.log((c ? 'ok ' : 'FAIL ') + n); if (!c) bad++; };
['358', '479', '281'].forEach(n => ck(region.includes(n), 'Circuit Tracks has ' + n));
ck(!region.includes('314') || region.includes('3141'), 'old 314 check');
process.exit(bad ? 1 : 0);
