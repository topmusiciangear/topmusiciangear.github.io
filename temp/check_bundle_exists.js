const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const g = guides.find(x=>x.id==='starter-studio');

// 1) ¿los bundles ya existen?
const BUSCAR = ['Scarlett 2i2 Studio','AudioBox iTwo','Volt 2 Studio','Studio Pack','Studio 4th Gen Pack'];
console.log('=== ¿LOS BUNDLES EXISTEN YA EN EL CATALOGO? ===');
BUSCAR.forEach(q=>{
  const hits = list.filter(p=>p.title.toLowerCase().indexOf(q.toLowerCase())>-1);
  console.log('  "' + q + '": ' + (hits.length? hits.map(h=>'id '+h.id+' '+h.title).join(', ') : 'NO EXISTE'));
});

// 2) los productos de la seccion de upgrade que propusiste
console.log('\n=== upgrade $1,000: productos buscados ===');
['M50x','Eris 3.5','G4M Acoustics','K&M 210','ATH-M50x'].forEach(q=>{
  const hits = list.filter(p=>p.title.toLowerCase().indexOf(q.toLowerCase())>-1);
  console.log('  "' + q + '": ' + (hits.length? hits.map(h=>'id '+h.id+' "'+h.title+'"').join(' | ') : 'NO EXISTE'));
});

// 3) que hay HOY en starter-studio
console.log('\n=== starter-studio HOY ===');
console.log('title: ' + g.title);
console.log('descripcion: ' + g.description);
console.log('featuredProducts (' + g.featuredProducts.length + '):');
g.featuredProducts.forEach(id=>{
  const p = list.find(x=>x.id===id);
  console.log('  id ' + id + ': ' + (p? p.title : '*** NO EN CATALOGO ***'));
});
console.log('\ntabla: ' + (g.productTable? g.productTable.columns.map(c=>c.title).join(' | ') : 'sin tabla'));
console.log('filas: ' + (g.productTable? g.productTable.rows.map(r=>r.label).join(' | ') : '-'));
console.log('\nveredictos (' + g.verdictProsCons.length + '):');
g.verdictProsCons.forEach(v=>console.log('  ' + v.name));
console.log('\nsecciones (' + g.sections.length + '):');
g.sections.forEach((s,i)=>console.log('  ' + (i+1) + '. ' + s.heading));