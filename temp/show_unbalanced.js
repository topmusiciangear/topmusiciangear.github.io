const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const targets = [
  ['best-monitors-for-small-rooms', 'conclusion'],
  ['budget-mics', 'sections[15].content'],
  ['budget-mics', 'sections[15].content_es'],
  ['fx-plugins', 'sections[0].content_es'],
  ['vocalign-vs-revoice-pro', 'sections[1].content'],
  ['wireless-intercom-systems', 'sections[0].content'],
  ['wireless-intercom-systems', 'sections[0].content_es'],
];

for (const [id, path] of targets) {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log(id + ': NO ENCONTRADA'); continue; }
  let val = g;
  for (const part of path.split('.')) {
    const m = part.match(/^(\w+)\[(\d+)\]$/);
    if (m) val = val[m[1]][Number(m[2])];
    else val = val[part];
  }
  console.log('\n===== ' + id + ' :: ' + path + ' =====');
  console.log(val);
}
