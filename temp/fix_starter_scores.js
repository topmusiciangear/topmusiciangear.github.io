const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
s = s.replace('"Universal Audio Apollo Twin X Gen 2": 9.5', '"Universal Audio Apollo Twin X Gen 2": 9.8');
s = s.replace('"Neumann TLM 102": 9.6', '"Neumann TLM 102": 9.8');
fs.writeFileSync('temp/score_overrides.js', s, 'utf8');
console.log('Fixed');