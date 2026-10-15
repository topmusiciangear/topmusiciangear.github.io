// Clasificar las 347 filas sin precio: ¿es correcto o es bug?
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const files = fs.readdirSync(BASE+'guides').filter(f=>f.endsWith('.html') && !f.includes('_es'));

const porTienda = {};
const sinNinguno = [];
let total = 0;

files.forEach(f=>{
  const d = fs.readFileSync(BASE+'guides/'+f,'utf8');
  // ir producto por producto
  [...d.matchAll(/openReviewModal\((\d+)\)/g)].forEach(m=>{
    const id = +m[1];
    const card = d.slice(m.index, m.index + 3500);
    const lista = card.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
    if (!lista) return;
    [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(f2=>{
      total++;
      const store = f2[1];
      const conPrecio = /data-price=|data-pb-|data-hu-/.test(f2[0]);
      if (!conPrecio) {
        porTienda[store] = (porTienda[store]||0)+1;
        const txt = f2[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
        if (!/Check price|Verificar precio|Agotado|Out of stock|No disponible/.test(txt)) {
          sinNinguno.push({ f: f.replace('.html',''), id, store, txt: txt.slice(0,60) });
        }
      }
    });
  });
});

console.log('filas totales: ' + total);
console.log('\n=== SIN PRECIO POR TIENDA ===');
Object.entries(porTienda).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  ' + String(v).padStart(4) + 'x  ' + k));

console.log('\n=== SIN PRECIO Y SIN "Check price" (posibles BUGS): ' + sinNinguno.length + ' ===');
sinNinguno.slice(0,25).forEach(x=>console.log('  ' + x.f.padEnd(24) + 'id ' + String(x.id).padStart(4) + '  ' + x.store.padEnd(12) + ' "' + x.txt + '"'));
if (sinNinguno.length>25) console.log('  ... y ' + (sinNinguno.length-25) + ' mas');

// agrupar los bugs por id
const porId = {};
sinNinguno.forEach(x=>{ porId[x.id+'|'+x.store] = x; });
console.log('\nproductos+tienda afectados: ' + Object.keys(porId).length);