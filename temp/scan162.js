const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
console.log('total guias:', G.length, '| claves de ejemplo:', Object.keys(G[0]).slice(0, 14).join(','));
const withCard = G.filter(g => JSON.stringify(g).includes('162'));
console.log('\nguias que mencionan 162 (json crudo):', withCard.length);
for (const g of withCard) {
  const fp = g.featuredProducts || g.featured_products || [];
  const ids = Array.isArray(fp) ? fp.map(x => typeof x === 'object' ? (x.id || x.productId) : x) : [];
  console.log('  -', g.id || g.slug || '(sin id)', '| cat', g.category, '| featuredProducts:', JSON.stringify(ids));
}
