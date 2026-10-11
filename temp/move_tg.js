var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
function rep(a, b) {
  var n = s.split(a).length - 1;
  if (!n) { console.log('NOT FOUND: ' + a.slice(0, 70)); process.exit(1); }
  s = s.split(a).join(b);
  console.log('replaced x' + n + ': ' + a.slice(0, 50));
}
var blockStart = s.indexOf('<div class="deals-card">');
var blockEnd = s.indexOf('</div>', s.indexOf('Join the Telegram channel')) + 6;
if (blockStart < 0 || blockEnd < 6) { console.log('BLOCK NOT FOUND'); process.exit(1); }
var block = s.slice(blockStart, blockEnd);
// 1. remove from current position (plus trailing blank line)
s = s.slice(0, blockStart) + s.slice(blockEnd).replace(/^\r?\n/, '');
// 2. insert right before <footer
var fi = s.indexOf('  <footer');
if (fi < 0) { console.log('FOOTER NOT FOUND'); process.exit(1); }
s = s.slice(0, fi) + block + '\n\n' + s.slice(fi);
fs.writeFileSync(f, s);
console.log('moved telegram block before footer OK');
