const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../data/products.json');
let raw = fs.readFileSync(file, 'utf8');
let data = JSON.parse(raw);

const mapping = {
  'Pattern': 'wave',
  'Pickups': 'sineWave',
  'Connectivity': 'signal',
  'Preamps': 'microphone',
  'Power': 'gauge',
  'Platforms': 'globe',
  'Range': 'signal',
};

let changes = 0;
for (const p of data) {
  if (!p.facts) continue;
  for (const f of p.facts) {
    const label = (f.label && f.label.en) ? f.label.en : null;
    if (!label) continue;
    if (mapping[label]) {
      const correctIcon = mapping[label];
      if (f.icon !== correctIcon) {
        // console.log(`Changing ${p.id} ${p.title} ${label} ${f.icon} -> ${correctIcon}`);
        f.icon = correctIcon;
        changes++;
      }
    }
  }
}

const out = JSON.stringify(data, null, 2).replace(/\n/g, '\r\n');
fs.writeFileSync(file, out, 'utf8');
console.log(`Changes made: ${changes}`);
