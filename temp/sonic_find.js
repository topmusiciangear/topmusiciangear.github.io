const fs = require('fs');
const g = fs.readFileSync('guides/best-beginner-electric-guitar.html', 'utf8');
// el catalogo embebido: buscar el objeto del producto 462 por su musicstore art
const tok = 'GIT0064626';
const hits = [...g.matchAll(new RegExp(tok, 'g'))].map(m => m.index);
console.log('ocurrencias del art MS en la pagina:', hits.length);
for (const i of hits) {
  const ctx = g.slice(Math.max(0, i - 700), i + 300);
  console.log('\n--- pos ' + i + ' ---');
  console.log(ctx.replace(/\s+/g, ' '));
}
