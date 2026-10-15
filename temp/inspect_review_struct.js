const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='active-vs-passive-pa');

// estructura de una review existente
console.log('=== claves de la guia ===');
console.log(Object.keys(g).join(', '));

// buscar donde viven las reviews
if (g.reviews) {
  console.log('\n=== g.reviews (primer review) ===');
  console.log(JSON.stringify(g.reviews[0], null, 2).slice(0, 1500));
} else if (g.sections) {
  console.log('\n=== g.sections (primer section) ===');
  console.log(JSON.stringify(g.sections[0], null, 2).slice(0, 1500));
} else {
  console.log('\nsin g.reviews ni g.sections');
  // buscar arrays de strings largos
  Object.keys(g).forEach(k=>{
    const v = g[k];
    if (Array.isArray(v) && v.length && typeof v[0] === 'string' && v[0].length > 200) {
      console.log('  ' + k + ': array de ' + v.length + ' strings largos');
    } else if (Array.isArray(v) && v.length && typeof v[0] === 'object') {
      console.log('  ' + k + ': array de ' + v.length + ' objetos, claves: ' + (v[0] ? Object.keys(v[0]).join(',') : ''));
    }
  });
}