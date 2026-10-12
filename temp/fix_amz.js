var fs = require('fs');
var m = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
m.forEach(function (x) {
  if (x.title === 'Beyerdynamic DT 990 Pro' && x.store === 'amazon') {
    x.price = 149.99; x.old_price = 169; x.badge_en = 'Save $19'; x.badge_es = 'Ahorra $19';
    console.log('DT990 -> 149.99/169');
  }
  if (x.title === 'Sennheiser HD 600' && x.store === 'amazon') {
    x.price = 269.9; x.old_price = 499.95; x.badge_en = 'Save $230'; x.badge_es = 'Ahorra $230';
    console.log('HD600 -> 269.90/499.95');
  }
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(m, null, 2) + '\n');
