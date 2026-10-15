// Por que las filas del desplegable siguen sin precio
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE+'guides/budget-mics.html','utf8');

console.log('=== FILAS DEL DESPLEGABLE: texto visible ===');
const lista = d.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
if (lista) {
  const filas = [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('filas: ' + filas.length + '\n');
  filas.slice(0,12).forEach((m,i)=>{
    const store = m[1];
    const txt = m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    const tieneAttr = /data-price=|data-pb-|data-hu-/.test(m[0]);
    console.log('  ' + String(i+1).padStart(2) + '. ' + store.padEnd(12) + (tieneAttr?'[precio]':'[      ]') + '  ' + txt.slice(0,60));
  });
  console.log('\n  con atributo de precio: ' + filas.filter(m=>/data-price=|data-pb-|data-hu-/.test(m[0])).length + ' / ' + filas.length);
}

// el producto concreto
console.log('\n=== PRODUCTO: Shure SM57 (id 5) ===');
const build = fs.readFileSync(BASE+'build-guides.js','utf8');
const m5 = build.match(/^\s*5:\s*\{[^}]*\{[^}]*\}[^}]*\}/m);
console.log('  entrada en el mapa:');
console.log('    ' + (m5 ? m5[0].replace(/\s+/g,' ').slice(0,240) : 'NO ENCONTRADA'));

// que hay despues: oos/na?
const ini5 = build.search(/^\s*5:\s*\{/m);
if (ini5 > -1) {
  console.log('\n  bloque completo (200c):');
  console.log('    ' + build.slice(ini5, ini5+200).replace(/\s+/g,' '));
}

// comprobar el orden de tiendas que genera las filas
console.log('\n=== ORDER (linea 6096) ===');
const s = build.split('\n');
console.log('  ' + (s[6095]||'').trim().slice(0,300));