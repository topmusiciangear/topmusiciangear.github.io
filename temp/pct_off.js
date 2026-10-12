var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
var a = '<span class="deal-percent">${pct}%</span>';
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
s = s.split(a).join('<span class="deal-percent">${pct}% off</span>');
fs.writeFileSync(f, s);
console.log('pct-off OK');
