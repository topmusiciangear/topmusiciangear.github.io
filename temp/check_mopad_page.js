const fs = require('fs');

// guias que usan los productos 468, 648 y 650
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const id of [468, 648, 650]) {
  const hit = guides.filter(g =>
    (g.featuredProducts || []).map(Number).includes(id) ||
    (g.sections || []).some(s => (s.products || []).map(Number).includes(id))
  ).map(g => g.id);
  console.log('producto ' + id + ' en guias: ' + (hit.join(', ') || '(ninguna)'));
}

// botones de tienda del producto 650 (version EN)
const s = fs.readFileSync('guides/monitor-setup.html', 'utf8');
const idx = s.indexOf('Auralex MoPAD-XL Monitor Speaker Isolation Pad');
const card = s.indexOf('ProductCard', idx) > -1 ? s.slice(idx, idx + 6000) : s.slice(Math.max(0, idx - 500), idx + 6000);
const urls = [...card.matchAll(/https?:\/\/[^"'<>\s]+/g)].map(m => m[0]);
console.log('\nURLs en la tarjeta (primeras 14):');
[...new Set(urls)].slice(0, 14).forEach(u => console.log('  ' + u.slice(0, 130)));
console.log('\nPrecio en tarjeta:', /39[.,]99/.test(card));
console.log('Aparece "Agotado":', /Agotado|Out of stock/i.test(card));
console.log('Aparece "No disponible":', /No disponible|Not available/i.test(card));

// JSON-LD del producto 650: disponibilidad
const j = s.indexOf('"name": "Auralex MoPAD-XL Monitor Speaker Isolation Pad"');
const chunk = s.slice(j, j + 2500);
console.log('\n--- offers JSON-LD ---');
const off = chunk.match(/"offers"[\s\S]{0,900}/);
console.log(off ? off[0].replace(/\s+/g, ' ').slice(0, 900) : '(no encontrado)');
