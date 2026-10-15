// Verificacion final antes de deploy
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const arr = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const list = Array.isArray(arr)?arr:arr.products;
const N = id => { const p=list.find(x=>x.id===id); return p?p.title:'??'+id; };
const g = guides.find(x=>x.id==='starter-studio');

console.log('=== ' + g.sections.length + ' SECCIONES ===');
g.sections.forEach((s,i)=>{
  const tipo = (s.products&&s.products.length===1) ? 'REVIEW  ' : 'ARGUMENT ';
  const prods = (s.products||[]).length ? (s.products||[]).map(N).join(', ').slice(0,58) : '(ninguno)';
  console.log('  ' + String(i).padStart(2) + ' ' + tipo + ' ' + s.heading.slice(0,56));
  console.log('        ES: ' + (s.heading_es||'').slice(0,56));
  console.log('        -> ' + prods);
});

console.log('\n=== INVARIANTE ===');
const todas = new Set();
g.sections.forEach(s=>(s.products||[]).forEach(p=>todas.add(p)));
console.log('productos con tarjeta: ' + todas.size);
console.log('featuredProducts sin tarjeta: ' + (g.featuredProducts.filter(id=>!todas.has(id)).join(', ')||'ninguno'));
console.log('tarjetas sin veredicto: ' + ([...todas].filter(id=>!g.verdictProsCons.some(v=>v.productId===id)).map(N).join(', ')||'ninguna'));
console.log('veredictos sin tarjeta: ' + (g.verdictProsCons.filter(v=>!todas.has(v.productId)).map(v=>v.name).join(', ')||'ninguno'));

// cada tarjeta con review propia de una linea
const revOwn = id => g.sections.some(s=>(s.products||[]).length===1 && s.products[0]===id);
console.log('tarjetas SIN review de una linea: ' + ([...todas].filter(id=>!revOwn(id)).map(N).join(', ')||'ninguna'));

console.log('\n=== 4+4 ===');
let fallos=0;
g.verdictProsCons.forEach(v=>{
  const a=[v.pros.length,v.cons.length,v.pros_es.length,v.cons_es.length];
  if(Math.min(...a)<4)fallos++;
});
console.log('veredictos <4: ' + fallos + ' de ' + g.verdictProsCons.length);

console.log('\n=== PARIDAD EN/ES ===');
console.log('secciones sin content_es: ' + g.sections.filter(s=>!s.content_es).length);
console.log('secciones sin heading_es: ' + g.sections.filter(s=>!s.heading_es).length);
const vsSinEs = g.verdictProsCons.filter(v=>!v.pros_es||!v.cons_es).length;
console.log('veredictos sin ES: ' + vsSinEs);

const dup={}; g.sections.forEach(s=>dup[s.heading]=(dup[s.heading]||0)+1);
console.log('encabezados repetidos: ' + Object.keys(dup).filter(h=>dup[h]>1).length);
const dupEs={}; g.sections.forEach(s=>{if(s.heading_es)dupEs[s.heading_es]=(dupEs[s.heading_es]||0)+1;});
console.log('encabezados ES repetidos: ' + Object.keys(dupEs).filter(h=>dupEs[h]>1).length);

let des=0; g.productTable.rows.forEach(r=>{ if(r.values.length!==g.productTable.columns.length) des++; });
console.log('celdas desajustadas: ' + des);
const cjk=(JSON.stringify(g).match(/[\u4e00-\u9fff]/g)||[]);
console.log('CJK: ' + (cjk.length?[...new Set(cjk)].join(''):'ninguno'));
console.log('title ES: ' + g.titleTag_es);
console.log('desc ES: ' + g.description_es.length + 'c');