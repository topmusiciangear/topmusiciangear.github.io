const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// active-vs-passive-pa final
const g = guides.find(x=>x.id==='active-vs-passive-pa');
console.log('=== active-vs-passive-pa ===');
console.log('columnas: ' + g.productTable.columns.length);
g.productTable.columns.forEach((c,i)=>console.log('  '+(i)+'. ' + c.title + ' / ' + c.title_es));
let des = 0;
g.productTable.rows.forEach(r=>{ if(r.values.length!==g.productTable.columns.length) des++; });
console.log('filas desajustadas: ' + des);
console.log('veredictos: ' + g.verdictProsCons.map(v=>v.name).join(' | '));

// ableton-vs-fl-studio
const g3 = guides.find(x=>x.id==='ableton-vs-fl-studio');
console.log('\n=== ableton-vs-fl-studio ===');
if (g3.productTable) {
  console.log('productTable: ' + g3.productTable.columns.map(c=>c.title).join(' | '));
} else if (g3.comparison) {
  console.log('comparison.headers: ' + JSON.stringify(g3.comparison.headers));
}
// buscar cualquier resto de "All Plugins"
const s = JSON.stringify(g3);
const n = (s.split('All Plugins').length-1);
console.log('restos de "All Plugins": ' + n);
if (n) {
  let idx = s.indexOf('All Plugins');
  while (idx > -1) { console.log('  ...' + s.slice(Math.max(0,idx-60), idx+40) + '...'); idx = s.indexOf('All Plugins', idx+1); }
}
console.log('Producer Edition presente: ' + (s.indexOf('Producer Edition') > -1 ? 'SI' : 'NO'));