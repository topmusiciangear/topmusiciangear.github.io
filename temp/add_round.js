var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
var adds = [
  {
    product_id: 60, title: 'UA 1176 Classic Limiter Collection', title_es: (prod(60).title_es || 'UA 1176 Classic Limiter Collection'),
    price: 29, old_price: 199, currency: '$', store: 'pluginboutique',
    store_url: 'https://www.pluginboutique.com/product/2-Effects/9-Limiter/10153-1176-Classic-Limiter-Collection',
    img: prod(60).img, badge_en: 'Save $170', badge_es: 'Ahorra $170',
    desc: 'The legendary FET limiter collection. 85% off until Nov 1.',
    desc_es: 'La legendaria colección de limitadores FET. 85% de descuento hasta el 1 de noviembre.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 124, title: prod(124).title, title_es: prod(124).title_es,
    price: 829, old_price: 1049, currency: '€', store: 'musicstore',
    store_url: 'https://www.musicstore.com/en_OE/EUR/Fender-Player-II-Stratocaster-HSS-MN-Transparent-Mocha-Burst/art-GIT0061903-010',
    img: prod(124).img, badge_en: 'Save €220', badge_es: 'Ahorra €220',
    desc: 'Player II Strat HSS in Transparent Mocha Burst. 21% off at Music Store (finish variant).',
    desc_es: 'Player II Strat HSS en Transparent Mocha Burst. 21% de descuento en Music Store (variante de acabado).',
    date_added: today, source: 'manual'
  },
  {
    product_id: 140, title: prod(140).title, title_es: prod(140).title_es,
    price: 562, old_price: 939, currency: '€', store: 'musicstore',
    store_url: 'https://www.musicstore.com/en_OE/EUR/Yamaha-P-225-WH/art-KEY0005824-000',
    img: prod(140).img, badge_en: 'Save €377', badge_es: 'Ahorra €377',
    desc: 'P-225 stage piano in white. 40% off at Music Store (WH finish variant).',
    desc_es: 'Piano de escenario P-225 en blanco. 40% de descuento en Music Store (variante blanca).',
    date_added: today, source: 'manual'
  },
  {
    product_id: 19, title: prod(19).title, title_es: prod(19).title_es,
    price: 288.64, old_price: 325.89, currency: '€', store: 'reverb',
    store_url: 'https://reverb.com/p/yamaha-hs8-powered-studio-monitor-single',
    img: prod(19).img, badge_en: 'Save €37.3', badge_es: 'Ahorra €37.3',
    desc: 'HS8 single monitor, B-stock. 12% price drop live on Reverb.',
    desc_es: 'Monitor HS8 individual, B-stock. Bajada del 12% en vivo en Reverb.',
    date_added: today, source: 'manual'
  }
];
adds.forEach(function (d) {
  if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
  else console.log('already listed: ' + d.title);
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
