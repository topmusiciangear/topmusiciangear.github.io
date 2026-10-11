var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
var adds = [
  {
    product_id: 375, title: 'XLN Audio RC-20 Retro Color', title_es: 'XLN Audio RC-20 Retro Color',
    price: 29, old_price: 99, currency: '$', store: 'pluginboutique',
    store_url: 'https://www.pluginboutique.com/product/2-Effects/44-Saturation/3016-RC-20-Retro-Color',
    img: prod(375).img, badge_en: 'Save $70', badge_es: 'Ahorra $70',
    desc: 'Creative FX plugin, 70% off until Oct 16 on Plugin Boutique.',
    desc_es: 'Plugin creativo, 70% de descuento hasta el 16 de octubre en Plugin Boutique.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 106, title: prod(106).title, title_es: prod(106).title_es,
    price: 899.99, old_price: 999.99, currency: '$', store: 'zzounds',
    store_url: 'https://www.zzounds.com/item--QSCK122',
    img: prod(106).img, badge_en: 'Save $100', badge_es: 'Ahorra $100',
    desc: 'QSC $100 instant saving, effective through 12/31/2026.',
    desc_es: 'Ahorro instantáneo de $100 de QSC, vigente hasta el 31/12/2026.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 42, title: prod(42).title, title_es: prod(42).title_es,
    price: 1199.99, old_price: 1299.99, currency: '$', store: 'zzounds',
    store_url: 'https://www.zzounds.com/item--SSLUF8',
    img: prod(42).img, badge_en: 'Save $100', badge_es: 'Ahorra $100',
    desc: 'SSL 8-fader DAW controller. Save $100 thru Dec 31 on zZounds.',
    desc_es: 'Controlador DAW de 8 faders de SSL. Ahorra $100 hasta el 31 de diciembre en zZounds.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 451, title: prod(451).title, title_es: prod(451).title_es,
    price: 229, old_price: 249, currency: '$', store: 'zzounds',
    store_url: 'https://www.zzounds.com/item--LRBPARADI',
    img: prod(451).img, badge_en: 'Save $20', badge_es: 'Ahorra $20',
    desc: 'Studio-quality active acoustic DI. Was $249, now $229 on zZounds.',
    desc_es: 'DI acústico activo. Era $249, ahora $229 en zZounds.',
    date_added: today, source: 'manual'
  }
];
adds.forEach(function (d) {
  if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
