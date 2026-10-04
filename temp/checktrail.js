const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beat-making');
for (let i = 0; i < 6; i++) {
  ['content', 'content_es'].forEach(k => {
    const t = g.sections[i][k] || '';
    const m = t.match(/<div class="guide-section-imgs"><img[^>]*>$/);
    console.log('sec' + (i + 1) + k, m ? 'TRAILING-OK' : 'DIFERENTE: ' + JSON.stringify(t.slice(-100)));
  });
}