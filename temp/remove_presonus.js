const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-monitors');

// Remove PreSonus Eris Studio 8 from featuredProducts
g.featuredProducts = g.featuredProducts.filter(id => id !== 550);

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('PreSonus removed from featuredProducts');