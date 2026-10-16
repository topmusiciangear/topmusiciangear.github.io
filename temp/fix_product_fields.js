const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

let fixed = 0;
products.forEach(p => {
  // If product has 'name' but no 'title', rename to 'title'
  if (p.name && !p.title) {
    p.title = p.name;
    delete p.name;
    fixed++;
  }
  // Ensure all products have 'brand'
  if (!p.brand) {
    console.log('Missing brand: ' + p.id + ' - ' + p.title);
  }
});

products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Fixed ' + fixed + ' products (name → title)');
console.log('Total products: ' + products.length);
