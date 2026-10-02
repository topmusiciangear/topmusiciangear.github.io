const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const s = G.find(x => x.id === 'best-bass-home-office').featuredSnippet;
console.log('antes: ' + s.key2_en + ' / ' + s.key2_es);
s.key2_en = 'Cheapest micro-scale bass for quick lines';
s.key2_es = 'Micro-escala más barato para líneas rápidas';
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('ok');
