const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
const lines = s.split('\n');
let idx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('repitch-vs-melodyne')) {
    idx = i;
    break;
  }
}
console.log('Found at line:', idx + 1);
if (idx !== -1) {
  const insert = '  "rme-vs-motu": {\n    "RME Babyface Pro FS": 9.8,\n    "MOTU M2": 9.4\n  },\n';
  lines.splice(idx, 0, insert);
  fs.writeFileSync('temp/score_overrides.js', lines.join('\n'), 'utf8');
  console.log('Added');
}