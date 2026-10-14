var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8');
var old = "  guides.forEach((guide, idx) => {";
var idx = t.indexOf(old);
if (idx < 0) { console.log('ABORT not found'); process.exit(1); }
var guard = "  var only = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;\n  guides.forEach((guide, idx) => {\n    if (only && only.indexOf(guide.id) === -1) return;";
t = t.slice(0, idx) + guard + t.slice(idx + old.length);
fs.writeFileSync(p, t, 'utf8');
console.log('OK guard inserted');
