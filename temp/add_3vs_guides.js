const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// 6 new products for the 3 VS guides
const newProducts = [
  { id: 1031, brand: 'Antares', name: 'AutoTune 2026', price: 250, category: 'plugins', subcategory: 'pitch', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/48-Audio-Editor/17161-AutoTune-2026' }, image: 'https://www.antarestech.com/images/products/autotune-2026/autotune-2026.jpg', desc: 'The industry-standard real-time pitch correction plugin. The T-Pain effect, live tuning, and natural vocal correction in one tool.' },
  { id: 1032, brand: 'Celemony', name: 'Melodyne 5 Essential', price: 99, category: 'plugins', subcategory: 'pitch', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/48-Audio-Editor/6446-Melodyne-5-Essential' }, image: 'https://www.celemony.com/images/products/melodyne-5/melodyne-5.jpg', desc: 'Surgical note-by-note pitch correction. The standard for natural-sounding vocal tuning and polyphonic audio editing.' },
  { id: 1033, brand: 'iZotope', name: 'Ozone 12 Advanced', price: 499, category: 'plugins', subcategory: 'mastering', stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/52-Mastering-Suite/15503-Ozone-12-Advanced' }, image: 'https://www.izotope.com/images/products/ozone/ozone-12/ozone-12-advanced.jpg', desc: 'AI-powered mastering suite with 20 pro modules. Assistant, Tonal Balance Control, and Master Rebalance for modern workflows.' },
  { id: 1034, brand: 'FabFilter', name: 'Mastering Bundle', price: 519, category: 'plugins', subcategory: 'mastering', stores: { pluginboutique: 'https://www.pluginboutique.com/product/81-Bundles/39-Effects-Bundles/16651-FabFilter-Mastering-Bundle' }, image: 'https://www.fabfilter.com/images/products/mastering-bundle/mastering-bundle.jpg', desc: 'Pro-Q 3, Pro-L 2, Pro-C 2, and Pro-MB. Surgical EQ, limiting, compression, and multiband for mastering and mixing.' },
  { id: 1035, brand: 'Synchro Arts', name: 'VocAlign 7 Pro', price: 249, category: 'plugins', subcategory: 'vocals', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/48-Audio-Editor/17164-VocAlign-7-Pro' }, image: 'https://www.synchroarts.com/images/products/vocalign-7-pro/vocalign-7-pro.jpg', desc: 'Multi-track vocal alignment with pitch and timing control. Align entire vocal stacks in seconds with per-track and per-clip control.' },
  { id: 1036, brand: 'Synchro Arts', name: 'Revoice Pro', price: 499, category: 'plugins', subcategory: 'vocals', stores: { pluginboutique: 'https://www.pluginboutique.com/product/3-Studio-Tools/48-Audio-Editor/17165-Revoice-Pro' }, image: 'https://www.synchroarts.com/images/products/revoice-pro/revoice-pro.jpg', desc: 'Standalone vocal production suite for large-scale projects. Advanced pitch, timing, and level control across multiple tracks simultaneously.' },
];

// Check for duplicates
const existingIds = new Set(products.map(p => p.id));
const existingNames = new Set(products.map(p => (p.brand + ' ' + p.name).toLowerCase()));
let added = 0;
newProducts.forEach(np => {
  const key = (np.brand + ' ' + np.name).toLowerCase();
  if (!existingIds.has(np.id) && !existingNames.has(key)) {
    products.push(np);
    added++;
  }
});

products.sort((a, b) => a.id - b.id);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Products added: ' + added + ' (total: ' + products.length + ')');

// Add TEST_SHOP_BTN entries
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const closeIdx = bg.lastIndexOf('\n};');
const entriesStr = `  1031: {prices:{pluginboutique:"$250.00"}},\n  1032: {prices:{pluginboutique:"$99.00"}},\n  1033: {prices:{pluginboutique:"$499.00"}},\n  1034: {prices:{pluginboutique:"$519.00"}},\n  1035: {prices:{pluginboutique:"$249.00"}},\n  1036: {prices:{pluginboutique:"$499.00"}},\n`;
bg = bg.substring(0, closeIdx) + entriesStr + bg.substring(closeIdx);
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('TEST_SHOP_BTN entries added: 6');
