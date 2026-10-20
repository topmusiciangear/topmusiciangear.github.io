const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
s = s.replace('"RME Babyface Pro FS": 9.7', '"RME Babyface Pro FS": 9.8');
fs.writeFileSync('temp/score_overrides.js', s, 'utf8');
console.log('Fixed');