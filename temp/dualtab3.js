const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/portable-interfaces_es.html', 'utf8');
const i = h.indexOf('Ultra-Compacta');
console.log(h.slice(Math.max(0, i - 800), i + 500).replace(/<[^>]*>/g, '|').slice(0, 900));
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'portable-interfaces');
console.log('--- secciones con Ultra:');
g.sections.forEach((s, k) => {
  const t = JSON.stringify(s);
  if (t.includes('Ultra-Compacta')) console.log('sec' + k, Object.keys(s).join(','));
});