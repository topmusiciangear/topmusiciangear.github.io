var fs = require('fs');
var base = 'C:/Users/Daniel/projects/topmusiciangear';
var p = base + '/build-guides.js';
var t = fs.readFileSync(p, 'utf8');

// 1) fix line 1222 heading fallback
var old = 'const h = isEs && s.heading_es ? s.heading_es : s.heading;';
var nw  = 'const h = isEs && (s.heading_es || s.h_es || "") ? (s.heading_es || s.h_es) : (s.heading || s.h || "");';
if (t.indexOf(old) < 0) { console.log('HEADING LINE NOT FOUND'); process.exit(1); }
t = t.split(old).join(nw ещё + old.length).split(',').join('');
fs.writeFileSync(p, t, 'utf8');
console.log('patched heading fallback -> OK');

// 2) verify syntax
try { require('child_process').execSync('node --check "' + p + '"', {stdio:'pipe'}); console.log('syntax OK'); }
catch(e){ console.log('SYNTAX FAIL: ' + e.message); process.exit(1); }
