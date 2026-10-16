const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const byId = {};
guides.forEach(g => { byId[g.id] = g; });
let n = 0;
guides.filter(g => g.category === 'plugins').forEach(g => {
  [['conclusion', 'title', ''], ['conclusion_es', 'title_es', '_es']].forEach(([field, tf, suf]) => {
    let html = g[field] || '';
    html = html.replace(/<a href="\/guides\/([a-z0-9-]+?)(_es)?\.html" class="guide-link-btn">[^<]*<\/a>/g, (m, id) => {
      const dest = byId[id];
      if (!dest) return m;
      n++;
      return '<a href="/guides/' + id + suf + '.html" class="guide-link-btn">' + dest[tf] + '</a>';
    });
    g[field] = html;
  });
});
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('anchors normalizados: ' + n);
