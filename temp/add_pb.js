var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
// Blackhole -> live EUR figures (ends Nov 1)
manual.forEach(function (x) {
  if (x.title === 'Eventide Blackhole' && x.store === 'pluginboutique') {
    x.price = 49.4; x.old_price = 102.85; x.currency = '€';
    x.badge_en = 'Save €53.5'; x.badge_es = 'Ahorra €53.5';
    console.log('blackhole updated to EUR live');
  }
});
var adds = [
  {
    product_id: 394, title: prod(394).title, title_es: prod(394).title_es,
    price: 39.33, old_price: 79.65, currency: '€', store: 'pluginboutique',
    store_url: 'https://www.pluginboutique.com/product/2-Effects/30-Distortion/10435-Motion-Harmonic',
    img: prod(394).img, badge_en: 'Save €40.3', badge_es: 'Ahorra €40.3',
    desc: 'Distortion playground with 50% off until Oct 31 on Plugin Boutique.',
    desc_es: 'Distorsión creativa con 50% de descuento hasta el 31 de octubre en Plugin Boutique.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 375, title: prod(375).title, title_es: prod(375).title_es,
    price: 29.25, old_price: 99.83, currency: '€', store: 'pluginboutique',
    store_url: 'https://www.pluginboutique.com/product/2-Effects/44-Saturation/3016-RC-20-Retro-Color',
    img: prod(375).img, badge_en: 'Save €70.6', badge_es: 'Ahorra €70.6',
    desc: 'Vintage warmth machine, 70% off until Oct 16 on Plugin Boutique.',
    desc_es: 'Calidez vintage, 70% de descuento hasta el 16 de octubre en Plugin Boutique.',
    date_added: today, source: 'manual'
  }
];
adds.forEach(function (d) {
  if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
  else console.log('already: ' + d.title);
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
