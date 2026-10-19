const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const html = fs.readFileSync(B + 'guides/best-headphones-for-mixing_es.html', 'utf8');

// Extraer cada seccion y ver si tiene imagen de producto
const heads = html.match(/<h2[^>]*>[^<]+<\/h2>/g) || [];
console.log('Secciones en HTML: ' + heads.length);
heads.forEach(h => {
  const i = html.indexOf(h);
  const seg = html.substring(i, i + 3000);
  const imgs = (seg.match(/guide-section-img|guide-product-card-img/g) || []).length;
  console.log('  ' + h.replace(/<[^>]+>/g, '') + '  -> imgs: ' + imgs);
});

// Verificar que no queden textos "Buy at Amazon" (estilo viejo)
const buyAt = (html.match(/Buy at\s*Amazon/g) || []).length;
console.log('\n" Buy at Amazon" restantes: ' + buyAt);
