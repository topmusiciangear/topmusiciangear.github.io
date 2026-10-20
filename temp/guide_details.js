const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json', 'utf8'));
const overrides = require('C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\score_overrides.js');

for (let i = 126; i <= 145; i++) {
  const g = guides[i];
  console.log('\n=== Index ' + i + ': ' + g.id + ' ===');
  console.log('Title ES:', g.title_es);
  console.log('Category:', g.category);
  
  // Get all unique product IDs from sections
  const productIds = new Set();
  g.sections.forEach(s => {
    if (s.products) {
      s.products.forEach(pid => productIds.add(pid));
    }
  });
  if (g.featuredProducts) {
    g.featuredProducts.forEach(pid => productIds.add(pid));
  }
  
  console.log('Product IDs:', Array.from(productIds));
  
  // Get product details
  Array.from(productIds).forEach(pid => {
    const p = products.find(pr => pr.id === pid);
    if (p) {
      let overrideScore = null;
      if (overrides[g.id] && overrides[g.id][p.title]) {
        overrideScore = overrides[g.id][p.title];
      }
      console.log('  - ' + p.title_es + ' (id:' + pid + ') | score:' + p.score + (overrideScore ? ' | override:' + overrideScore : ''));
    } else {
      console.log('  - ID ' + pid + ' NOT FOUND in products.json');
    }
  });
}