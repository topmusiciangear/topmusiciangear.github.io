const fs = require('fs');
const idx = fs.readFileSync('index.html', 'utf8');
console.log('=== script/link tags in index.html ===');
const re = /<script[^>]*src="([^"]+)"[^>]*>|<\/script>/g;
let m;
while ((m = re.exec(idx))) if (m[1]) console.log(' script:', m[1]);
const cssRe = /<link[^>]*href="([^"]+\.css[^"]*)"[^>]*>/g;
while ((m = cssRe.exec(idx))) console.log(' css:', m[1]);
console.log('charset meta:', /<meta[^>]*charset=[^>]*>/i.exec(idx) ? /<meta[^>]*charset=[^>]*>/i.exec(idx)[0] : 'NOT FOUND');
console.log();
const s = fs.readFileSync('js/app.min.js', 'utf8');
console.log('=== app.min.js mojibake contexts (first 12) ===');
const re2 = /.{28}(â€¦|â€[™“”¢–—]|Ã\S).{18}/g;
let c = 0, t;
while ((t = re2.exec(s)) && c < 12) { console.log('  ...' + t[0] + '...'); c++; }
console.log();
console.log('total buffer byte size vs utf8 length:');
const buf = Buffer.from(s, 'utf8');
console.log(' length decoded:', s.length, ' bytes utf8:', buf.length);