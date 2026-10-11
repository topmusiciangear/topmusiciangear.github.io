var fs = require('fs');
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var cands = [
  [73, 1599.99, 1799.99, 'VOXAC30C2'],
  [126, 1639.99, 1839.99, null],
  [156, 1739.99, 1939.99, null],
  [294, 244, 349, 'POSSPARK2'],
  [311, 449.99, 499.99, null],
  [317, 999, 1149, null],
  [318, 1899, 2199.99, null],
  [352, 209.99, 249.99, null],
  [361, 799.99, 999.99, null],
  [455, 8999, 9999, 'TAYPS14CEV2'],
  [489, 174, 249, 'POSSPARKMINI'],
  [529, 899, 959, null],
  [539, 399.99, 459.99, null],
  [548, 1149, 1399.99, null],
  [624, 123.99, 149.99, null],
  [629, 1199.99, 1399.99, null]
];
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var today = new Date().toISOString().slice(0, 10);
cands.forEach(function (c) {
  var p = prods.find(function (x) { return x.id === c[0]; });
  if (!p) { console.log('NO PRODUCT ' + c[0]); return; }
  var url = (p.stores && p.stores.zzounds) || '';
  if (c[3] && url.toLowerCase().indexOf(c[3].toLowerCase()) < 0) { console.log('URL MISMATCH ' + c[0] + ': ' + url); return; }
  if (manual.some(function (x) { return x.product_id === c[0] && x.store === 'zzounds'; })) { console.log('already: ' + c[0]); return; }
  var sv = Math.round((c[2] - c[1]) * 100) / 100;
  manual.push({
    product_id: p.id, title: p.title, title_es: p.title_es,
    price: c[1], old_price: c[2], currency: '$', store: 'zzounds',
    store_url: url, img: p.img,
    badge_en: 'Save $' + sv, badge_es: 'Ahorra $' + sv,
    desc: p.desc, desc_es: p.desc_es,
    date_added: today, source: 'manual'
  });
  console.log('added ' + c[0] + ' ' + p.title);
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
