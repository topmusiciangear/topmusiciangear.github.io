const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE+'guides/starter-studio.html','utf8');

// volcar los 3 primeros botones completos
console.log('=== PRIMEROS 3 shop-btn-primary (starter-studio) ===');
const btns = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>[\s\S]*?<\/a>/g)];
btns.slice(0,3).forEach((m,i)=>{
  console.log('\n--- boton ' + (i+1) + ' ---');
  console.log(m[0].slice(0,700));
});

// que clases de boton existen
console.log('\n=== CLASES DE BOTON EN LA PAGINA ===');
const clases = {};
[...d.matchAll(/<a[^>]*class="([^"]*shop-btn[^"]*)"/g)].forEach(m=>{
  clases[m[1]] = (clases[m[1]]||0)+1;
});
Object.entries(clases).forEach(([k,v])=>console.log('  ' + v + 'x  ' + k));

// atributos data-* presentes
console.log('\n=== ATRIBUTOS data-* EN BOTONES ===');
const attrs = {};
[...d.matchAll(/<(?:a|button)[^>]*shop-btn[^>]*>/g)].forEach(m=>{
  [...m[0].matchAll(/data-[a-z-]+=/g)].forEach(a=>{ attrs[a[0]]=(attrs[a[0]]||0)+1; });
});
Object.entries(attrs).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  ' + String(v).padStart(4) + 'x  ' + k));

// texto visible del boton (¿lleva el importe dentro?)
console.log('\n=== TEXTO VISIBLE DE LOS PRIMEROS 5 ===');
btns.slice(0,5).forEach((m,i)=>{
  const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  console.log('  ' + (i+1) + ': ' + txt.slice(0,110));
});

// ¿esta el mapa TEST_SHOP_BTN embebido?
console.log('\n=== MAPA DE PRECIOS EMBEBIDO ===');
const guiones = ['TEST_SHOP_BTN','__VPC__','shopPrices','SHOP_DATA','window.TEST_SHOP'];
guiones.forEach(k=>console.log('  ' + k + ': ' + (d.indexOf(k)>-1?'presente':'AUSENTE')));
// buscar cualquier asignacion grande de objeto con precios
const asignaciones = [...d.matchAll(/window\.([A-Za-z_$][\w$]*)\s*=/g)].map(m=>m[1]);
console.log('\n  variables window.* asignadas: ' + [...new Set(asignaciones)].join(', '));