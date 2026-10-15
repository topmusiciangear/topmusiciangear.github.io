const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='live-sound-pa');
console.log('live-sound-pa tabla:');
console.log('columnas EN: ' + g.productTable.columns.map(c=>c.title).join(' | '));
console.log('filas:');
g.productTable.rows.forEach(r=>{
  console.log('\n[' + r.label + '] ' + (r.label_es?'/ '+r.label_es:''));
  r.values.forEach((v,i)=>{
    const col = g.productTable.columns[i] ? g.productTable.columns[i].title : '?';
    console.log('  ' + col.padEnd(32) + ': ' + v);
  });
});