const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const newProducts = [
  {
    id: 1037, title: 'Solid State Logic SSL Mastering Bundle', brand: 'Solid State Logic',
    price: 209.99, category: 'plugins', subcategory: 'mastering',
    stores: { pluginboutique: 'https://www.pluginboutique.com/product/81-Bundles/39-Effects-Bundles/14036-Solid-State-Logic-SSL-Fusion-Bundle' },
    desc: 'Premium mastering suite with the legendary SSL Bus Compressor and Fusion Stereo Enhancer. The official SSL analog console sound in your DAW.',
    rating: 4.7, reviews: 120, badge: 'premium'
  },
  {
    id: 1038, title: 'NUGEN Audio ISL 2st', brand: 'NUGEN Audio',
    price: 149, category: 'plugins', subcategory: 'mastering',
    stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/9-Limiter/1787-ISL-2st' },
    desc: 'True-peak limiter for broadcast and streaming. Surgical transparency with inter-sample peak detection.',
    rating: 4.8, reviews: 85, badge: 'pro'
  },
  {
    id: 1039, title: 'Synchro Arts RePitch 2 Standard + VocAlign 7 Pro Bundle', brand: 'Synchro Arts',
    price: 249, category: 'plugins', subcategory: 'vocals',
    stores: { pluginboutique: 'https://www.pluginboutique.com/product/81-Bundles/84-Mix-Master/17933-RePitch-2-Standard-VocAlign-7-Pro-Bundle' },
    desc: 'Complete vocal production bundle: natural pitch correction and industry-standard timing alignment in one package.',
    rating: 4.5, reviews: 60, badge: 'bundle'
  }
];

const existingIds = new Set(products.map(p => p.id));
const existingTitles = new Set(products.map(p => (p.brand + ' ' + p.title).toLowerCase()));
let added = 0;

newProducts.forEach(np => {
  const key = (np.brand + ' ' + np.title).toLowerCase();
  if (!existingIds.has(np.id) && !existingTitles.has(key)) {
    products.push(np);
    added++;
    console.log('Added: ' + np.id + ' | ' + np.brand + ' ' + np.title + ' | $' + np.price);
  }
});

products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Total products: ' + products.length);

// Add TEST_SHOP_BTN entries
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const insertPoint = bg.indexOf('};function hollyDefaultRegion()');
if (insertPoint !== -1) {
  const entries = `\n  1037: {prices:{pluginboutique:"$209.99"}},\n  1038: {prices:{pluginboutique:"$149.00"}},\n  1039: {prices:{pluginboutique:"$249.00"}},`;
  bg = bg.substring(0, insertPoint) + entries + '\n' + bg.substring(insertPoint);
  fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
  console.log('TEST_SHOP_BTN: 3 entries added');
}

try { new Function(bg); console.log('SYNTAX OK'); } catch(e) { console.log('SYNTAX ERROR: ' + e.message); }
