const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;
const g = guides.find(x=>x.id==='beat-making');
console.log('=== veredicto Akai MPC Sample ===');
const v = g.verdictProsCons.find(x=>/MPC Sample/i.test(x.name||x.title));
console.log('pros: ' + v.pros.join(' / '));
console.log('cons: ' + v.cons.join(' / '));
console.log('pros_es: ' + v.pros_es.join(' / '));
console.log('cons_es: ' + v.cons_es.join(' / '));

console.log('\n=== esos veredictos mencionan productos que NO estan en la guia? ===');
const ids = new Set();
(g.featuredProducts||[]).forEach(i=>ids.add(i));
g.sections.forEach(s=>(s.products||[]).forEach(i=>ids.add(i)));
const enGuia = new Set([...ids].map(i=>{const p=arr.find(x=>x.id===i);return p?norm(p.title):'';}).map(n=>n.toLowerCase()));
function norm(s){return String(s).toLowerCase().replace(/[^a-z0-9]/g,'');}
g.verdictProsCons.forEach(vv=>{
  const txt = [...vv.pros,...vv.cons].join(' ');
  const menciones = arr.filter(p=>{
    const t = p.title.toLowerCase();
    const partes = t.split(/\s+/);
    return partes.length>=2 && txt.toLowerCase().indexOf(partes[0]+' '+partes[1])>-1;
  });
  const fuera = menciones.filter(p=>!enGuia.has(norm(p.title)));
  if (fuera.length) console.log('  ' + (vv.name||vv.title) + ' -> menciona ' + fuera.map(p=>p.title).join(', '));
});

console.log('\n=== catalogo: datos de los 3 Akai para la tabla ===');
[256,188,257].forEach(id=>{
  const p = arr.find(x=>x.id===id);
  console.log('\n  id ' + id + ': ' + p.title + ' | $' + p.price + ' | ' + p.category);
  console.log('     ' + p.desc);
  console.log('     tiendas: ' + Object.keys(p.stores||{}).join(', '));
});