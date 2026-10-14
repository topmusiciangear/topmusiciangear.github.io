var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8').split('\r\n').join('\n');
var old = "  guides.forEach((guide, idx) => {";
if (t.indexOf(old) < 0) { console.log('ABORT'); process.exit(1); }
var nw = "  var only = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;\n  guides.forEach((guide, idx) => {\n    if (only && only.indexOf(guide.id) === -1) return;";
t = t.replace(old, nw);
fs.writeFileSync(p, t, 'utf8');
console.log('guard ok');
