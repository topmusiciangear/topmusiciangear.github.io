const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
console.log('=== guias que usan "comparison" en vez de "productTable" ===');
const conComp = guides.filter(g => g.comparison && !g.productTable);
console.log('  ' + conComp.length + ' guias\n');
conComp.forEach(g => {
  const c = g.comparison;
  console.log('--- ' + g.id + ' (' + g.title + ')');
  console.log('    claves del comparison: ' + Object.keys(c).join(', '));
  if (c.columns) console.log('    columnas: ' + c.columns.map((x,i)=>i+':'+(x.title||x)).join(' | '));
  if (c.products) console.log('    products: ' + c.products.map((x,i)=>i+':'+(x.title||x.name||x)).join(' | '));
  if (c.rows) console.log('    filas: ' + c.rows.length + ' -> ' + c.rows.slice(0,3).map(r=>(r.label||r.title)+': '+(Array.isArray(r.values)?r.values.map(v=>v.value||v).join(' ~ '):JSON.stringify(r).slice(0,80))).join('\n           '));
  console.log('');
});
console.log('\n=== detalle completo de sidechain-modulation-plugins.comparison ===');
const sc = guides.find(g=>g.id==='sidechain-modulation-plugins');
console.log(JSON.stringify(sc.comparison, null, 1).slice(0, 4000));