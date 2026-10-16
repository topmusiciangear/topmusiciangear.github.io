const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// ---------- 1. new product 1041 ----------
let products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const p1039 = products.find(p => p.id === 1039);
if (!products.some(p => p.id === 1041)) {
  products.push({
    id: 1041, brand: 'iZotope', price: 299, category: 'plugins', subcategory: 'vocals',
    stores: { pluginboutique: 'https://www.pluginboutique.com/product/2-Effects/54-Vocal-Processing/11118-Nectar-4-Advanced' },
    image: 'https://banners.pluginboutique.com/h9eygdlz3rn706h6wgtf97gryzsq',
    desc: 'Complete AI-assisted vocal chain: Vocal Assistant, Auto-Level, Voices layering and Backer for polished, mix-ready vocals.',
    title: 'Nectar 4 Advanced',
    img: 'https://banners.pluginboutique.com/h9eygdlz3rn706h6wgtf97gryzsq'
  });
  products.sort((a, b) => a.id - b.id);
  fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
}
console.log('1041: ' + (products.some(p => p.id === 1041) ? 'OK' : 'FALTA'));

// ---------- 2. TEST 1041 ----------
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
if (!bg.includes('1041:')) {
  const anchor = '1040: {prices:{pluginboutique:"€72.00"';
  if (!bg.includes(anchor)) { console.log('ANCHOR 1040 NO ENCONTRADO'); process.exit(1); }
  bg = bg.replace(anchor, '1041: {prices:{pluginboutique:"€331.75"},pbCur:{us:"$299.00",uk:"£237.97"}},\n1040: {prices:{pluginboutique:"€72.00"');
  fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
}
try { new Function(fs.readFileSync(B + 'build-guides.js', 'utf8')); console.log('TEST 1041 OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); process.exit(1); }
