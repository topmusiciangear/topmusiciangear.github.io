const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const idx = g.findIndex(a => a.id === 'studio-furniture');
const f = g[idx].verdictProsCons[3].cons_es[4];
const n = f.split('A cuestan tres veces los AcouFoam 6').join('Cuestan tres veces los AcouFoam 6');
if (f !== n) {
  g[idx].verdictProsCons[3].cons_es[4] = n;
  fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
  console.log('FIXED', idx, JSON.stringify(n));
} else {
  console.log('NOT FOUND');
}