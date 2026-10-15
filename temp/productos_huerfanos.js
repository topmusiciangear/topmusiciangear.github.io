const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const usados = new Map(); // id -> [guias]
g.forEach(gg => {
  const ids = new Set([
    ...(gg.featuredProducts || []),
    ...(gg.sections || []).flatMap(s => s.products || [])
  ]);
  ids.forEach(id => {
    if (!usados.has(id)) usados.set(id, []);
    usados.get(id).push(gg.id);
  });
});

const huerfanos = p.filter(x => !usados.has(x.id));
console.log('=== PRODUCTOS ===');
console.log('  en catalogo : ' + p.length);
console.log('  en alguna guia: ' + usados.size);
console.log('  EN NINGUNA GUIA: ' + huerfanos.length);

console.log('\n=== LISTA DE HUERFANOS ===');
huerfanos.forEach(x => {
  console.log('  ' + String(x.id).padStart(4) + '  ' + (x.brand || '').padEnd(18) + (x.title || '').slice(0, 52) + '   [$' + x.price + ' ' + (x.category || '') + ']');
});

// ids referenciados que NO existen en el catalogo (referencias rotas)
const idsCat = new Set(p.map(x => x.id));
const rotas = [...usados.keys()].filter(id => !idsCat.has(id));
console.log('\n=== REFERENCIAS ROTAS (id en guia pero no en catalogo): ' + rotas.length + ' ===');
rotas.forEach(id => console.log('  id ' + id + ' en: ' + usados.get(id).join(', ')));
