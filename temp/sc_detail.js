const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const sc = guides.find(g=>g.id==='sidechain-modulation-plugins');
console.log('claves: ' + Object.keys(sc.comparison).join(', '));
console.log(JSON.stringify(sc.comparison, null, 1));

// y quien mas usa comparison con shape de N columnas (no vs)
console.log('\n\n=== guias "comparison" cuyo shape NO es de 2 valores (posible tabla N columnas) ===');
guides.forEach(g => {
  if (!g.comparison) return;
  const c = g.comparison;
  const filas = c.rows || [];
  if (!filas.length) { console.log('  ' + g.id + ': comparison sin rows'); return; }
  const claves = Object.keys(filas[0]).filter(k => /^val\d/.test(k));
  if (claves.length !== 2) console.log('  ' + g.id + ': ' + claves.length + ' valores por fila -> ' + claves.join(','));
});