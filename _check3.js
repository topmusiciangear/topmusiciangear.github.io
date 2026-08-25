const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
g.forEach(h => {
  const fields = ['intro','conclusion','conclusion_es',...h.sections.map(s=>s.content),...h.sections.map(s=>s.content_es)];
  fields.forEach((t, i) => {
    if (!t) return;
    if (t.includes('href="budget-interfaces.html"')) {
      console.log(h.id, 'relative link found');
    }
  });
});
