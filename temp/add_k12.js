var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
var d = {
  product_id: 106, title: prod(106).title, title_es: prod(106).title_es,
  price: 899.99, old_price: 999.99, currency: '$', store: 'zzounds',
  store_url: 'https://www.zzounds.com/item--QSCK122',
  img: prod(106).img, badge_en: 'Save $100', badge_es: 'Ahorra $100',
  desc: 'QSC $100 instant saving, effective through 12/31/2026. Same SKU verified at Guitar Center/Sweetwater.',
  desc_es: 'Ahorro instantáneo de $100 de QSC, vigente hasta el 31/12/2026. Mismo SKU verificado en Guitar Center/Sweetwater.',
  date_added: today, source: 'manual'
};
if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
else console.log('already listed');
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
