const fs = require('fs');
var r = fs.readFileSync('js/guide-scores.js','utf8');

// Replace Scarlett score: 9.4 → 9.2
r = r.replace('"Focusrite Scarlett 2i2 4th Gen": 9.4', '"Focusrite Scarlett 2i2 4th Gen": 9.2');
fs.writeFileSync('js/guide-scores.js', r, 'utf8');

// Verify
var updated = fs.readFileSync('js/guide-scores.js','utf8');
var idx = updated.indexOf('Focusrite Scarlett 2i2 4th Gen');
console.log('Scarlett context:', updated.substring(idx, idx+45));