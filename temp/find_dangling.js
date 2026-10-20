const fs = require('fs');
const path = require('path');
const guides = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'guides.json'), 'utf8'));
const ids = process.argv.slice(2);
const re = /\b(de|con|para|en|a|por|sin|y|o|que|del|al|los|las|un|una)\.\s|—\s*$/g;
for (const id of ids) {
  const g = guides.find(x => x.id === id);
  for (const f of ['verdict_es', 'conclusion_es', 'verdict', 'conclusion']) {
    const t = (g[f] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(t))) {
      console.log(id + '.' + f + ' :: ...' + t.slice(Math.max(0, m.index - 70), m.index + 30) + ' <<<');
    }
  }
}
