const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const byId = {};
guides.forEach(g => { byId[g.id] = g; });
let bad = 0;
guides.filter(g => g.category === 'plugins').forEach(g => {
  [['conclusion', 'title', '.html'], ['conclusion_es', 'title_es', '_es.html']].forEach(([field, tf, suf]) => {
    const html = g[field] || '';
    [...html.matchAll(/<a href="(\/guides\/([a-z0-9-]+)(_es)?\.html)" class="guide-link-btn">([^<]+)<\/a>/g)].forEach(m => {
      const dest = byId[m[2]];
      if (m[1] !== '/guides/' + m[2] + suf || (dest && m[4] !== dest[tf])) { bad++; console.log('MAL: ' + g.id + ' ' + m[0].slice(0, 110)); }
    });
  });
});
console.log(bad ? 'quedan ' + bad : 'TODO CORRECTO');
