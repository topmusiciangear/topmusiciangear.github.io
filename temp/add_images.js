const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Add img field to products 1037-1039 using Plugin Boutique CDN images
const imageMap = {
  1037: 'https://www.pluginboutique.com/images/products/14036.jpg',  // SSL Mastering Bundle
  1038: 'https://www.pluginboutique.com/images/products/1787.jpg',   // NUGEN ISL 2st
  1039: 'https://www.pluginboutique.com/images/products/17933.jpg'   // RePitch 2 + VocAlign 7 Pro Bundle
};

products.forEach(p => {
  if (imageMap[p.id] && !p.img) {
    p.img = imageMap[p.id];
    console.log('Added img to: ' + p.id + ' | ' + p.title);
  }
});

products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Total products: ' + products.length);
