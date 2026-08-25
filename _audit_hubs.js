const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function getProductName(id) {
  const prod = p.find(x => x.id === id);
  return prod ? prod.title : 'NOT FOUND';
}

g.forEach(h => {
  // Check sections for product IDs
  h.sections.forEach((s, i) => {
    if (s.products && s.products.length > 0) {
      const names = s.products.map(id => getProductName(id));
      console.log(`${h.id} - section ${i}: ${names.join(', ')}`);
    }
  });
  // Check grid (section 0 products)
  if (h.sections[0] && h.sections[0].products && h.sections[0].products.length > 0) {
    // already covered above
  }
});
