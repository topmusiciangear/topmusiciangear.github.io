const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let fixed = 0;
g.forEach(q => {
  q.sections.forEach(s => {
    if (!s.content) s.content = '';
    if (!s.content_es) s.content_es = '';
    if (!s.verdict) s.verdict = '';
    if (!s.verdict_es) s.verdict_es = '';
    if (!s.pros) s.pros = [];
    if (!s.pros_es) s.pros_es = [];
    if (!s.cons) s.cons = [];
    if (!s.cons_es) s.cons_es = [];
    if (!s.specs) s.specs = {};
    fixed++;
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Fixed missing fields for', fixed, 'sections across all guides');