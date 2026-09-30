// Vuelca el contexto real alrededor de la card de un producto (markup estatico).
const fs = require('fs');
const html = fs.readFileSync(process.argv[3] || 'guides/starter-studio.html', 'utf8');
const id = process.argv[2] || '20';
const at = html.search(new RegExp('openReviewModal\\(' + id + '\\)'));
if (at < 0) { console.log('id ' + id + ' no esta en ' + (process.argv[3] || 'guides/starter-studio.html')); process.exit(0); }

// ir al inicio del div de la card: busca el ultimo '<div class="guide-product-caro' antes de at
const start = html.lastIndexOf('<div class="guide-product-caro', at);
const end = html.indexOf('<div class="guide-product-caro', at + 1);
const card = html.slice(start, end < 0 ? at + 6000 : end);
console.log('longitud card:', card.length);
console.log('\n--- ATRIBUTOS/ETIQUETAS INTERESANTES ---');
for (const re of [/data-store="[a-z]+"/g, /data-price='[^']+'/g, /data-pb-[a-z-]+="[^"]*"/g, /class="[^"]*shop[^"]*"/g, /shop-buttons/g]) {
  const m = [...new Set(card.match(re) || [])];
  console.log(String(re).padEnd(34), m.join('  ') || '(nada)');
}
console.log('\n--- PRIMEROS 2400 CHARS DE LA CARD ---');
console.log(card.slice(0, 2400));
