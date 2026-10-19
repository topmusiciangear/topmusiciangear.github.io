const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Extraer todos los productos de cada guía con su posición
const guideProducts = {};
guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns;
  guideProducts[g.id] = cols.map((c, i) => ({
    pos: i + 1,
    title: c.title || c.title_es,
    currentScore: products.find(p => p.title === c.title || p.title_es === c.title_es)?.score || 'N/A'
  }));
});

// Mostrar resumen
console.log('=== PRODUCTOS POR GUÍA ===\n');
Object.entries(guideProducts).forEach(([gid, prods]) => {
  console.log(gid + ' (' + prods.length + ' productos):');
  prods.forEach(p => console.log('  ' + p.pos + '. ' + p.title + ' [' + p.currentScore + ']'));
  console.log('');
});

// Encontrar productos en múltiples guías
const productGuides = {};
Object.entries(guideProducts).forEach(([gid, prods]) => {
  prods.forEach(p => {
    if (!productGuides[p.title]) productGuides[p.title] = [];
    productGuides[p.title].push({ guide: gid, pos: p.pos });
  });
});

const multiGuide = Object.entries(productGuides).filter(([, g]) => g.length > 1);
console.log('=== PRODUCTOS EN MÚLTIPLES GUÍAS ===');
console.log('Total: ' + multiGuide.length + ' productos en ' + multiGuide.reduce((a, [, g]) => a + g.length, 0) + ' guías\n');

// Detectar inversiones
console.log('=== INVERSIONES DE SCORE ===');
let inversiones = 0;
Object.entries(guideProducts).forEach(([gid, prods]) => {
  for (let i = 0; i < prods.length - 1; i++) {
    const a = products.find(p => p.title === prods[i].title || p.title_es === prods[i].title)?.score || 0;
    const b = products.find(p => p.title === prods[i + 1].title || p.title_es === prods[i + 1].title)?.score || 0;
    if (a < b - 0.05) {
      inversiones++;
      console.log(gid + ': ' + prods[i].title + ' (' + a + ') < ' + prods[i + 1].title + ' (' + b + ')');
    }
  }
});
console.log('\nTotal inversiones: ' + inversiones);