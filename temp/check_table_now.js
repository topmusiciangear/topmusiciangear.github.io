const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='starter-studio');
console.log('H1 EN titleTag:    ' + g.titleTag);
console.log('H1 ES titleTag_es: ' + g.titleTag_es);
console.log('H1 EN title:       ' + g.title);
console.log('H1 ES title_es:    ' + g.title_es);
console.log('\n=== COLUMNAS ===');
g.productTable.columns.forEach((c,i)=>{
  console.log('  ' + i + '. title:    ' + c.title);
  console.log('     title_es: ' + (c.title_es||'(SIN CAMPO)'));
});
console.log('\n=== FILAS (orden) ===');
g.productTable.rows.forEach((r,i)=>{
  console.log('  ' + i + '. ' + r.label + '  /  ' + (r.label_es||''));
});