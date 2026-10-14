const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-electric-guitar');
g.sections.forEach((s, i) => {
  const t = (s.content || '') + (s.content_es || '');
  const c = t.match(/[\u4e00-\u9fff]/g);
  if (c) {
    const j = t.search(/[\u4e00-\u9fff]/);
    console.log('idx ' + i + ' | heading: ' + s.heading);
    console.log('   CJK: ' + JSON.stringify([...new Set(c)]));
    console.log('   ctx: ' + JSON.stringify(t.slice(Math.max(0, j - 50), j + 30)));
  }
});