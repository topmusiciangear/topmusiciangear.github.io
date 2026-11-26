const fs = require('fs');
var r = fs.readFileSync('js/guide-scores.js','utf8');

// Replace MOTU M2 score: 9.4 → 9.3
r = r.replace('"MOTU M2": 9.4', '"MOTU M2": 9.3');
console.log('MOTU M2: 9.4 → 9.3');

// Replace Focusrite Scarlett 2i2 4th Gen score: 9.7 → 9.2
r = r.replace('"Focusrite Scarlett 2i2 4th Gen": 9.7', '"Focusrite Scarlett 2i2 4th Gen": 9.2');
console.log('Scarlett 2i2: 9.7 → 9.2');

fs.writeFileSync('js/guide-scores.js', r, 'utf8');
console.log('Updated js/guide-scores.js');

// Verify
var updated = fs.readFileSync('js/guide-scores.js','utf8');
console.log('MOTU M2 score in file:', updated.includes('"MOTU M2": 9.3'));
console.log('Scarlett score in file:', updated.includes('"Focusrite Scarlett 2i2 4th Gen": 9.2'));