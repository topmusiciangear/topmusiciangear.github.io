const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// Columnas actuales de active-vs-passive-pa
const g2 = guides.find(x=>x.id==='active-vs-passive-pa');
console.log('active-vs-passive-pa columnas actuales (' + g2.productTable.columns.length + '):');
g2.productTable.columns.forEach((c,i)=>console.log('  '+(i)+'. ' + c.title + '  /  ' + (c.title_es||'')));
console.log('filas: ' + g2.productTable.rows.map(r=>r.label).join(' | '));

// Extraer los specs de los 3 productos de live-sound-pa
const g1 = guides.find(x=>x.id==='live-sound-pa');
const NECESITO = ['EV ZLX-12P-G2','QSC K12.2','Yamaha DBR12'];
console.log('\n\n=== SPECS DE ' + NECESITO.join(', ') + ' desde live-sound-pa ===');
NECESITO.forEach(nombre=>{
  const idx = g1.productTable.columns.findIndex(c => c.title.includes(nombre));
  if (idx < 0) { console.log('\n' + nombre + ': NO ENCONTRADO'); return; }
  const col = g1.productTable.columns[idx];
  console.log('\n' + col.title + ' / ' + col.title_es);
  g1.productTable.rows.forEach(r=>{
    const v = r.values[idx];
    console.log('  ' + r.label.padEnd(22) + ' ' + v.value);
    console.log('  ' + (r.label_es||'').padEnd(22) + ' ' + (v.value_es||''));
  });
});