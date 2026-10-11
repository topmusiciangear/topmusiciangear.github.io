var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
var d = {
  product_id: 42, title: prod(42).title, title_es: prod(42).title_es,
  price: 1199.99, old_price: 1299.99, currency: '$', store: 'zzounds',
  store_url: 'https://www.zzounds.com/item--SSLUF8',
  img: prod(42).img, badge_en: 'Save $100', badge_es: 'Ahorra $100',
  desc: 'SSL 8-fader DAW controller. Save $100 thru Dec 31 on zZounds.',
  desc_es: 'Controlador DAW de 8 faders de SSL. Ahorra $100 hasta el 31 de diciembre en zZounds.',
  date_added: today, source: 'manual'
};
if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
else console.log('already listed');
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
