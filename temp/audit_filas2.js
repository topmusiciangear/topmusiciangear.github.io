// Version simple: recorrer todas las filas del desplegable de todas las paginas
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html') && !f.includes('_es'));

const porTienda = {};
const bugs = [];
let total = 0, conPrecio = 0;

files.forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f,'utf8');
  // cada shop-more-list
  [...d.matchAll(/<div class="shop-more-list"[\s\S]*?<\/div>/g)].forEach(l=>{
    [...l[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m=>{
      total++;
      const store = m[1];
      const ok = /data-price=|data-pb-|data-hu-/.test(m[0]);
      if (ok) { conPrecio++; return; }
      porTienda[store] = (porTienda[store]||0)+1;
      const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      const tieneAviso = /Check price|Verificar precio|Agotado|Out of stock|No disponible|Not Available/i.test(txt);
      if (!tieneAviso) bugs.push({ f: f.replace('.html',''), store, txt: txt.slice(0,70) });
    });
  });
});

console.log('=== RESUMEN ===');
console.log('filas totales: ' + total + ' | con precio: ' + conPrecio + ' (' + Math.round(conPrecio/total*100) + '%)');
console.log('\n=== SIN PRECIO, POR TIENDA ===');
Object.entries(porTienda).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  ' + String(v).padStart(4) + 'x  ' + k));
console.log('\n=== POSIBLES BUGS (sin precio NI aviso): ' + bugs.length + ' ===');
bugs.slice(0,20).forEach(b=>console.log('  ' + b.f.padEnd(24) + b.store.padEnd(12) + '"'+b.txt+'"'));
if (bugs.length>20) console.log('  ... y ' + (bugs.length-20) + ' mas');
// agrupar por tienda+texto
const g = {};
bugs.forEach(b=>{ const k = b.store+' :: '+b.txt; g[k]=(g[k]||0)+1; });
console.log('\n=== AGRUPADOS ===');
Object.entries(g).sort((a,b)=>b[1]-a[1]).slice(0,15).forEach(([k,v])=>console.log('  ' + String(v).padStart(3) + 'x  ' + k));