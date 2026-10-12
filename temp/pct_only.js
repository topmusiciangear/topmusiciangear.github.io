var fs = require('fs');
var f = 'build-deals.js';
var s = fs.readFileSync(f, 'utf8');
var a = "const pctLabel = '';";
if (s.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
s = s.split(a).join("const pctLabel = pct > 0 ? ` <span class=\"deal-sep\">\u00B7</span> <span class=\"deal-percent\">${pct}%</span>` : '';");
fs.writeFileSync(f, s);
console.log('pct-only OK');
