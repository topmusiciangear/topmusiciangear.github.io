const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/products.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let changes = 0;
for (const p of data) {
  if (!p.facts) continue;
  for (const f of p.facts) {
    const label = (f.label && f.label.en) ? f.label.en : null;
    if (label === 'Body') {
      if (f.icon !== 'guitar') {
        f.icon = 'guitar';
        changes++;
      }
    }
  }
}

const out = JSON.stringify(data, null, 2).replace(/\n/g, '\r\n');
fs.writeFileSync(file, out, 'utf8');
console.log('Body icon changed to guitar:', changes, 'facts');
