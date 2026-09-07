const fs = require('fs');
const lines = fs.readFileSync('data/guides.json', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('"id": "best-bass-amps"'));
for (let i = idx; i < idx + 100; i++) {
  console.log(i + 1, JSON.stringify(lines[i]));
}