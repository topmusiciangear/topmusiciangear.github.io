const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const g = guides.find(x=>x.id==='starter-studio');

console.log('=== STARTER-STUDIO REESCRITA ===');
console.log('titulo EN: ' + g.titleTag);
console.log('titulo ES: ' + g.titleTag_es);
console.log();
console.log('TABLA (' + g.productTable.columns.length + ' columnas, ' + g.productTable.rows.length + ' filas):');
g.productTable.columns.forEach(c=>console.log('  - ' + c.title + '  /  ' + c.title_es));
console.log();
console.log('presupuestos:');
g.productTable.rows.filter(r=>/Total/i.test(r.label)).forEach(r=>{
  console.log('  ' + g.productTable.columns.map(c=>c.title+': '+r.values[g.productTable.columns.indexOf(c)].value).join(' | '));
});
console.log();
console.log('VEREDICTOS (' + g.verdictProsCons.length + '):');
g.verdictProsCons.forEach(v=>{
  const p = list.find(x=>x.id===v.productId);
  const en = Math.min(v.pros.length, v.cons.length), es = Math.min(v.pros_es.length, v.cons_es.length);
  console.log('  ' + (en>=4 && es>=4 ? 'OK ' : '!! ') + String(en+'/'+es).padEnd(6) + v.name.padEnd(52) + (p? 'id '+p.id : 'SIN ID'));
});
console.log();
console.log('SECCIONES (' + g.sections.length + '):');
g.sections.forEach((s,i)=>{
  const en = s.content.length, es = s.content_es.length;
  console.log('  ' + (i+1) + '. ' + s.heading.slice(0,62));
  console.log('     ES: ' + s.heading_es.slice(0,62));
  console.log('     ' + en + 'c EN / ' + es + 'c ES' + (es>0?'':'  !! SIN ES'));
});
console.log();
console.log('featuredProducts (' + g.featuredProducts.length + '):');
g.featuredProducts.forEach(id=>{
  const p = list.find(x=>x.id===id);
  console.log('  id ' + id + ': ' + (p?p.title:'*** NO EXISTE ***'));
});
console.log();
// verificacion de integridad
let fallos = 0;
// toda columna de tabla debe Mentionar productos del catalogo
const err = [];
g.verdictProsCons.forEach(v=>{ if(!v.productId || !list.find(x=>x.id===v.productId)) err.push('veredicto sin producto valido: '+v.name); });
g.productTable.rows.forEach(r=>{ r.values.forEach((v,i)=>{ if(!v.value || !v.value_es) err.push('celda vacia: '+r.label+' col'+i); }); });
console.log('errores de integridad: ' + (err.length||'ninguno'));
err.forEach(e=>console.log('  ' + e));