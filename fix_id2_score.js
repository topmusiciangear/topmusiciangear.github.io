const fs = require('fs');
var r = fs.readFileSync('js/guide-scores.js', 'utf8');

// Find the best-interface section
var startIdx = r.indexOf('"best-interface": {');
var endIdx = r.indexOf('},', startIdx) + 2;
var section = r.substring(startIdx, endIdx);

// Replace Audient iD2 score: 9.6 → 9.5
section = section.replace('"Audient iD2": 9.6', '"Audient iD2": 9.5');

// Replace in the full file
r = r.substring(0, startIdx) + section + r.substring(endIdx);
fs.writeFileSync('js/guide-scores.js', r, 'utf8');

// Verify
var updated = fs.readFileSync('js/guide-scores.js', 'utf8');
var newStartIdx = updated.indexOf('"best-interface": {');
var newEndIdx = updated.indexOf('},', newStartIdx) + 2;
var newSection = updated.substring(newStartIdx, newEndIdx);
console.log('Updated section:');
console.log(newSection);