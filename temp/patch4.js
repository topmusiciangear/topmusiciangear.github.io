var fs = require('fs');
var f = 'build-guides.js';
var s = fs.readFileSync(f, 'utf8');

var oldInner = "var dispPriceSpan=dispPrice?'<span style=\"margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap\"><span style=\"font-weight:700;color:#fff\">'+dispPrice+'</span></span>':'';) : '';";
var newInner = "'<span style=\"margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap\"><span style=\"font-weight:700;color:#fff\">'+dispPrice+'</span></span>') : '';";

if (s.indexOf(oldInner) < 0) { console.error('target not found'); process.exit(1); }
s = s.split(oldInner).join(newInner);
fs.writeFileSync(f, s);
console.log('repaired');