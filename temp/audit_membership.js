// AUDITORIA: un producto declara estar en una guia, pero really se ve alli?
// Compara los ids del JSON (lo que cree el buscador) con las tarjetas reales en vivo
const https = require('https');
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
function get(u){return new Promise(r=>{const q=https.get(u,{headers:{'User-Agent':'Mozilla/5.0'}},s=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>r(d));});q.on('error',()=>r(''));});}
async function pool(ids,n,fn){const o=new Array(ids.length);let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<ids.length){const k=i++;o[k]=await fn(ids[k]);}}));return o;}

const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const products = Array.isArray(P) ? P : P.products;
const byId = {}; products.forEach(p => byId[p.id] = p);

(async()=>{
  const res = await pool(guides.map(g=>g.id), 8, id => get('https://topmusiciangear.com/guides/'+id+'.html'));
  const falsos = [];   // el buscador dice que esta aqui, pero no se ve
  const ausentes = []; // se ve aqui, pero el buscador no lo lista
  let leidas = 0;
  res.forEach((d, k) => {
    if (!d) return;
    leidas++;
    const g = guides[k];
    // ids que el JSON declara (lo que usa findProductGuides)
    const declarados = new Set();
    [].concat(g.featuredProducts||[], g.products||[]).concat(...(g.sections||[]).map(s=>s.products||[])).forEach(i=>declarados.add(i));
    // ids realmente visibles en la pagina
    const visibles = new Set([...d.matchAll(/openReviewModal\((\d+)\)/g)].map(m=>Number(m[1])));
    [...declarados].forEach(id => {
      if (!visibles.has(id)) falsos.push({ gid: g.id, id, t: byId[id] ? byId[id].title : 'id ' + id });
    });
    visibles.forEach(id => {
      if (!declarados.has(id)) ausentes.push({ gid: g.id, id, t: byId[id] ? byId[id].title : 'id ' + id });
    });
  });
  console.log('paginas leidas: ' + leidas + ' de ' + guides.length);
  console.log('\n=== A) el buscador dice que el producto esta en la guia, pero NO se ve alli ===');
  console.log('   ' + falsos.length);
  falsos.forEach(f => console.log('   !! ' + f.gid.padEnd(30) + ' ' + f.t + ' (id ' + f.id + ')'));
  console.log('\n=== B) el producto se ve en la pagina, pero el buscador NO lo lista ===');
  console.log('   ' + ausentes.length);
  ausentes.forEach(f => console.log('   !! ' + f.gid.padEnd(30) + ' ' + f.t + ' (id ' + f.id + ')'));
  fs.writeFileSync(BASE+'temp/guide_membership.txt',
    'DECLARA SIN APARECER:\n' + falsos.map(f=>f.gid+' | '+f.t+' ('+f.id+')').join('\n') +
    '\n\nAPARECE SIN DECLARAR:\n' + ausentes.map(f=>f.gid+' | '+f.t+' ('+f.id+')').join('\n'));
  console.log('\nguardado: temp/guide_membership.txt');
})();