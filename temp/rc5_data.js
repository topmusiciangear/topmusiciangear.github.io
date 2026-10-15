const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const g = guides.find(x => x.id === 'best-reverb-delay');

// 1) ficha de catalogo del RC-5
const p = arr.find(x => x.id === 200);
console.log('=== CATALOGO id 200 ===');
console.log('titulo: ' + p.title);
console.log('precio: $' + p.price);
console.log('desc  : ' + (p.desc || p.description || '').slice(0, 400));
console.log('desc_es: ' + (p.desc_es || '').slice(0, 400));
console.log('tiendas: ' + JSON.stringify(p.stores, null, 1));

// 2) su seccion de review en la guia
console.log('\n=== SECCION DEL RC-5 EN LA GUIA ===');
g.sections.forEach((s, i) => {
  if ((s.products || []).indexOf(200) > -1) {
    console.log('seccion ' + i + ': ' + (s.heading || s.h));
    console.log('EN> ' + (s.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    console.log('\nES> ' + (s.content_es || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  }
});

// 3) la tabla: filas y donde caeria el RC-5
console.log('\n=== TABLA: columnas y primera fila ===');
console.log(g.productTable.columns.map((c, i) => i + ':' + c.title).join(' | '));
g.productTable.rows.forEach(r => console.log('  ' + r[0] + ' :: ' + r.slice(1).join(' ~ ')));