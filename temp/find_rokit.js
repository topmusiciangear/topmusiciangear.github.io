const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
const dump = (label, val) => {
  if (typeof val !== 'string' || !val.includes('Rokit')) return;
  const idx = val.indexOf('Rokit');
  console.log(label + ': ...' + val.slice(Math.max(0, idx - 80), idx + 80).replace(/\s+/g, ' '));
};
dump('conclusion', guide.conclusion);
dump('conclusion_es', guide.conclusion_es);
dump('verdict', guide.verdict);
dump('verdict_es', guide.verdict_es);
dump('description', guide.description);
dump('description_es', guide.description_es);
Object.keys(guide.featuredSnippet || {}).forEach(k => dump('sn.' + k, guide.featuredSnippet[k]));
guide.sections.forEach((s, i) => { dump('sec' + i + '.content', s.content); dump('sec' + i + '.content_es', s.content_es); dump('sec' + i + '.heading', s.heading); dump('sec' + i + '.heading_es', s.heading_es); });
guide.verdictProsCons.forEach(v => { dump('pc.' + v.name + '.pros', JSON.stringify(v.pros)); dump('pc.' + v.name + '.cons', JSON.stringify(v.cons)); });
