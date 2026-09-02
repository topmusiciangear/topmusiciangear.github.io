const fs = require('fs');
const g = JSON.parse(fs.readFileSync('./data/guides.json', 'utf8'));
const p = g.filter(x => x.category === 'plugins');
p.forEach(x => {
  const m = x.conclusion_es.match(/href="([^"]+)"[^>]*>Más información/);
  console.log(x.id, m ? m[1] : 'NO LINK');
});
