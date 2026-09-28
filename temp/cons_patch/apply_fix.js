var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8');
var lines = t.split(/\r?\n/);
var i = 1221; // 1-based line 1222
var cur = lines[i];
console.log('CURRENT[' + (i + 1) + ']: ' + cur);
if (cur.indexOf('s.heading') === -1) { console.log('ABORT: line not heading'); process.exit(1); }
lines[i] = "    const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');";
fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('WROTE OK; NEW line 1222: ' + lines[i]);
