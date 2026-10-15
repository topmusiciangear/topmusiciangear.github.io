const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-monitors-for-small-rooms_es.html', 'utf8');

const occ = [...d.matchAll(/Eris Studio 5/g)];
console.log('apariciones de "Eris Studio 5": ' + occ.length);
occ.forEach((m, i) => {
  const ini = Math.max(0, m.index - 300);
  const ctx = d.slice(ini, m.index + 120).replace(/\s+/g, ' ');
  console.log('\n--- #' + (i + 1) + ' @' + m.index + ' ---');
  console.log('  ...' + ctx + '...');
});

// contar las tarjetas de producto por nombre
const titulos = [...d.matchAll(/guide-product-card-title[^>]*>([\s\S]{0,120}?)</g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
console.log('\n=== TARJETAS (' + titulos.length + ') ===');
titulos.forEach((t, i) => console.log('  [' + i + '] ' + t));
