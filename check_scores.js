const fs = require('fs');
var r = fs.readFileSync('js/guide-scores.js','utf8');
var motuMatches = r.match(/MOTU M2": [\d.]+/g);
console.log('MOTU M2 entries:', motuMatches);
var scarlettMatches = r.match(/Focusrite Scarlett 2i2 4th Gen": [\d.]+/g);
console.log('Scarlett entries:', scarlettMatches);