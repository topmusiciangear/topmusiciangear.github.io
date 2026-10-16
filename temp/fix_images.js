const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const realImages = {
  1037: 'https://banners.pluginboutique.com/qrom3bkaupeoutpyjhny8d49a9u5',
  1038: 'https://banners.pluginboutique.com/elqw05lrkgrz1o0zwkp034szzin3',
  1039: 'https://banners.pluginboutique.com/3bhwnpoh5wihvumtoon7jm18z2mp'
};

products.forEach(p => {
  if (realImages[p.id]) {
    p.img = realImages[p.id];
    console.log('Fixed img for: ' + p.id + ' | ' + p.title);
  }
});

products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Total products: ' + products.length);
