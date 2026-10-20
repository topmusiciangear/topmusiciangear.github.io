const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const q = g.find(x => x.id === 'best-monitors-for-small-rooms');

q.sections.forEach(s => {
  if (!s.verdict_es) s.verdict_es = '';
  if (!s.pros_es) s.pros_es = [];
  if (!s.cons_es) s.cons_es = [];
  if (!s.specs) s.specs = {};
  if (!s.content_es) s.content_es = '';
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixed missing fields for best-monitors-for-small-rooms');