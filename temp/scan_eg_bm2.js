const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['best-electric-guitar', 'budget-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  g.sections.filter(s => (s.products || []).length === 1).forEach(s => {
    const t = (s.content || '') + (s.content_es || '');
    const m = t.match(/<[A-Za-z]+>/g);
    if (m) console.log(id + ' | ' + s.heading.slice(0, 40) + ' -> ' + JSON.stringify([...new Set(m)]));
    const c = t.match(/[\u4e00-\u9fff]/g);
    if (c) {
      const i = t.search(/[\u4e00-\u9fff]/);
      console.log('CJK >> ' + s.heading + ' :: ...' + t.slice(Math.max(0, i - 90), i + 50) + '...');
    }
  });
});