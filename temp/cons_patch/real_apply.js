var fs = require('fs');
var repo = 'C:/Users/Daniel/projects/topmusiciangear';
var p = repo + '/build-guides.js';
var t = fs.readFileSync(p, 'utf8');
var orig = t;

// --- FIX 1: heading fallback (single line) ---
var a = "const h = isEs && s.heading_es ? s.heading_es : s.heading;";
if (t.split(a).length - 1 !== 1) { console.log('ABORT fix1 count=' + (t.split(a).length - 1)); process.exit(1); }
t = t.split(a).join("const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');");

// --- FIX 2: ONLY_GUIDES guard on the guide .forEach line ---
var anchor = "guides.forEach((guide, idx) => {";
var cnt = t.split(anchor).length - 1多在;
console.log('forEach anchor count: ' + cnt2);  // <-- placeholder, will fix below

process.exit(0);
