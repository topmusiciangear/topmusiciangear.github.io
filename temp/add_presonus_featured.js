const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-monitors');

// Add PreSonus Eris Studio 8 to featuredProducts
g.featuredProducts.push(550);

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('featuredProducts updated');