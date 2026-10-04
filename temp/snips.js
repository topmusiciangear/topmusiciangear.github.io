const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beat-making');
const seen = new Set();
for (let i = 0; i < 6; i++) {
  ['content', 'content_es'].forEach(k => {
    const t = g.sections[i][k] || '';
    const m = t.match(/<div class="guide-section-imgs"><img[^>]*>$/);
    if (m && !seen.has(m[0])) { seen.add(m[0]); console.log('SNIP' + (i + 1) + ': ' + m[0]); }
  });
}