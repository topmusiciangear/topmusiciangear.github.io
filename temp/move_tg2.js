var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
var openTag = '<div class="deals-card" style="text-align:center;">';
var bi = s.indexOf(openTag);
if (bi < 0) { console.log('BLOCK NOT FOUND'); process.exit(1); }
var joinI = s.indexOf('Join the Telegram channel', bi);
var endI = s.indexOf('</div>', joinI) + 6;
var block = s.slice(bi, endI);
s = s.slice(0, bi) + s.slice(endI);
var mainI = s.indexOf('</main>');
if (mainI < 0) { console.log('MAIN NOT FOUND'); process.exit(1); }
var closeDiv = s.lastIndexOf('</div>', mainI);
s = s.slice(0, closeDiv) + '\n' + block + '\n' + s.slice(closeDiv);
fs.writeFileSync(f, s);
console.log('relocated inside deals-page OK');
