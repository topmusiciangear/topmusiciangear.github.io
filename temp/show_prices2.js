const fs = require('fs');
const f = process.argv[2] || 'guides/studio-furniture.html';
const c = fs.readFileSync(f, 'utf8');
// price spans inside dropdown rows
const re = /<span style="font-weight:700;color:(?:#fff|#a8a8a8)">([^<]+)<\/span>/g;
const out = [];
let m;
while ((m = re.exec(c))) out.push(m[1]);
console.log('=== ' + f + ' (' + out.length + ' price spans)');
console.log([...new Set(out)].slice(0, 14).join('\n'));
// primary button price
const p = c.indexOf('class="shop-btn-primary"');
const seg = c.slice(p, p + 4000);
const tail = seg.match(/ - ([^<]{0,40})<\/span><\/span><\/a>/);
console.log('\nprimary button price: ' + (tail ? JSON.stringify(tail[1]) : 'n/a (Amazon => Check price)'));
