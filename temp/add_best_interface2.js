const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
const lines = s.split('\n');
const insert = '  "best-interface": {\n    "RME Babyface Pro FS": 9.8,\n    "Universal Audio Apollo Twin X Gen 2": 9.7,\n    "Audient iD14 MkII": 9.5,\n    "SSL 2+ MKII": 9.4,\n    "Focusrite Scarlett 2i2 4th Gen": 9.3,\n    "MOTU M2": 9.2,\n    "Universal Audio Volt 276": 9.1,\n    "Universal Audio Volt 2": 9.1,\n    "IK Multimedia AXE I/O": 9.0\n  },\n';
lines.splice(411, 0, insert);
fs.writeFileSync('temp/score_overrides.js', lines.join('\n'), 'utf8');
console.log('Added');