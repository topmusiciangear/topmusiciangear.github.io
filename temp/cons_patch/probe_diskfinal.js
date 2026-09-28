var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8');
var A = "const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');";
console.log('fix1 in disk: ' + (t.indexOf(A) >= 0 ? 'YES' : 'NO'));
var B = "const h = isEs && s.heading_es ? s.heading_es : s.heading;";
console.log('old form remaining: ' + (t.indexOf(B) >= 0 ? 'YES(BAD)' : 'NO'));
