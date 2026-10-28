const fs = require('fs');
const s = fs.readFileSync('data/products.json', 'utf8');
for (const id of [348, 364, 365, 370, 371, 372, 22, 107, 115, 570, 571, 163, 441, 173]) {
  const i = s.indexOf('"id": ' + id + ',');
  if (i < 0) { console.log(id + ' NOT FOUND'); continue; }
  const j = s.indexOf('"id": ', i + 10);
  const block = s.slice(i, j < 0 ? i + 4000 : j);
  const line = (block.split('\r\n').find(l => /"amazon"\s*:/.test(l)) || '').trim();
  console.log(String(id).padEnd(5) + ' ' + (line || '(sin linea amazon)'));
}
