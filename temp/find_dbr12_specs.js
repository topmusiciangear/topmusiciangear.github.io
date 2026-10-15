const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));

// DBR12 en budget-pa-systems
const g = guides.find(x=>x.id==='budget-pa-systems');
const idx = g.productTable.columns.findIndex(c => c.title.includes('DBR12'));
console.log('DBR12 en budget-pa-systems: columna ' + idx + ' (' + (idx>=0 ? g.productTable.columns[idx].title : 'NO') + ')');
if (idx >= 0) {
  g.productTable.rows.forEach(r=>{
    const v = r.values[idx];
    console.log('  ' + r.label.padEnd(22) + ' ' + v.value);
    console.log('  ' + (r.label_es||'').padEnd(22) + ' ' + (v.value_es||''));
  });
}

// Verificar que JRX215, CBR12, ELX200-12 no dicen pasivo en las columnas
const g2 = guides.find(x=>x.id==='active-vs-passive-pa');
console.log('\n=== active-vs-passive-pa: cabeceras que faltan Altavoz Pasivo ===');
g2.productTable.columns.forEach((c,i)=>{
  console.log('  ' + i + '. ' + c.title + '  /  ' + (c.title_es||''));
});

// Verificar también los nombres de veredicto
console.log('\nveredictos:');
g2.verdictProsCons.forEach(v=>console.log('  ' + v.name + '  /  ' + (v.name_es||'')));