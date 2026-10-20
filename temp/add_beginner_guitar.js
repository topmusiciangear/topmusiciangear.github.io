const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
const lines = s.split('\n');

const target = '  "best-amp-modelers": {';
let idx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"best-amp-modelers"')) {
    idx = i;
    break;
  }
}
console.log('Found at line:', idx + 1);
if (idx !== -1) {
  const insert = '  "best-beginner-electric-guitar": {\n    "Yamaha Pacifica 112V": 9.6,\n    "Squier Sonic Stratocaster HT": 9.5,\n    "Squier Affinity Series Stratocaster": 9.4,\n    "Yamaha Revstar Element RSE20": 9.4,\n    "Epiphone Les Paul Special-II E1": 9.3,\n    "Jet Guitars JS-300": 9.2,\n    "Ibanez Gio GRG121DX": 9.1,\n    "Squier Sonic Mustang": 9.0,\n    "Squier Debut Series Stratocaster": 8.8,\n    "Enya Nova Go Sonic Smart Electric Guitar": 9.2\n  },\n';
  lines.splice(idx, 0, insert);
  fs.writeFileSync('temp/score_overrides.js', lines.join('\n'), 'utf8');
  console.log('Added best-beginner-electric-guitar');
} else {
  console.log('NOT FOUND');
}