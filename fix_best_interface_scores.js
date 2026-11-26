const fs = require('fs');
var r = fs.readFileSync('js/guide-scores.js','utf8');

// Find the best-interface section
var startIdx = r.indexOf('"best-interface": {');
var endIdx = r.indexOf('},', startIdx) + 2;
var section = r.substring(startIdx, endIdx);

console.log('BEFORE:');
console.log(section);

// Apply replacements within this section only
section = section.replace('"Audient iD14 MkII": 9.5', '"Audient iD2": 9.6');
section = section.replace('"MOTU M2": 9.2', '"MOTU M2": 9.3');
section = section.replace('"Focusrite Scarlett 2i2 4th Gen": 9.3', '"Focusrite Scarlett 2i2 4th Gen": 9.2');
section = section.replace('"Universal Audio Volt 2": 9.1', '"Universal Audio Volt 2 Gen 2": 9.3');

// Replace in the full file
r = r.substring(0, startIdx) + section + r.substring(endIdx);
fs.writeFileSync('js/guide-scores.js', r, 'utf8');

// Verify
var updated = fs.readFileSync('js/guide-scores.js','utf8');
var newStartIdx = updated.indexOf('"best-interface": {');
var newEndIdx = updated.indexOf('},', newStartIdx) + 2;
var newSection = updated.substring(newStartIdx, newEndIdx);
console.log('\nAFTER:');
console.log(newSection);