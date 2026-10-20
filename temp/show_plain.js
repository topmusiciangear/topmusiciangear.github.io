const fs = require('fs');
const path = require('path');
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const ids = process.argv.slice(2);
for (const id of ids) {
  const g = guides.find(x => x.id === id);
  console.log('===== ' + id + ' =====');
  const t = (g.verdict_es || '').replace(/<\/p>/g, '\n').replace(/<[^>]+>/g, '').replace(/[ \t]+/g, ' ').trim();
  console.log(t);
  console.log();
}
