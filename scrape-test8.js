const fs = require('fs');

(async () => {
  const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
  
  // Products needing MusikProduktiv URLs
  const musikProducts = products.filter(p =>
    p.stores.musikproduktiv === 'https://www.musik-produktiv.de/search'
  );
  
  // Products needing Bax Music URLs
  const baxProducts = products.filter(p => !p.stores.baxmusic);
  
  console.log(`MusikProduktiv search URLs: ${musikProducts.length}`);
  console.log(`Bax Music missing URLs: ${baxProducts.length}`);
  
  // Output all product IDs and titles for easy reference
  console.log('\n=== MUSIKPRODUKTIV PRODUCTS ===');
  musikProducts.forEach((p, i) => {
    console.log(`${i+1}. [${p.id}] ${p.title}`);
  });
  
  console.log('\n=== BAX MUSIC PRODUCTS ===');
  baxProducts.forEach((p, i) => {
    console.log(`${i+1}. [${p.id}] ${p.title}`);
  });
})();
