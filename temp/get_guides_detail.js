const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json', 'utf8'));

const targetGuides = guides.slice(146, 166);

targetGuides.forEach((g, i) => {
  console.log(`\n=== ${146+i}: ${g.id} - ${g.title_es} ===`);
  console.log(`Category: ${g.category}`);
  console.log(`Sections:`);
  g.sections.forEach((s, si) => {
    console.log(`  Section ${si}: ${s.heading_es}`);
    if (s.products && s.products.length > 0) {
      s.products.forEach(pid => {
        const prod = products.find(p => p.id === pid);
        if (prod) {
          console.log(`    Product: ${prod.title_es} (id: ${pid}, score: ${prod.score})`);
        } else {
          console.log(`    Product: UNKNOWN (id: ${pid})`);
        }
      });
    }
  });
  console.log(`FeaturedProducts: ${g.featuredProducts ? g.featuredProducts.join(', ') : 'none'}`);
});