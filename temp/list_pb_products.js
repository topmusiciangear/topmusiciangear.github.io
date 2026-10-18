const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const pbProducts = products.filter(p => p.stores && p.stores.pluginboutique).map(p => ({
  id: p.id,
  title: p.title,
  url: p.stores.pluginboutique
}));

console.log('Total productos con PB: ' + pbProducts.length);
pbProducts.forEach(p => console.log('  ' + p.id + ' | ' + p.title.slice(0, 50) + ' | ' + p.url));

// Guardar para el script de scraping
fs.writeFileSync(B + 'temp/pb_urls_to_scrape.json', JSON.stringify(pbProducts, null, 2), 'utf8');