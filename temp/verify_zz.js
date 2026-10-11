var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/deals.json', 'utf8'));
var zz = d.filter(function (x) { return x.store === 'zzounds'; });
console.log('zz on page: ' + zz.length);
zz.forEach(function (x) { console.log(' ' + x.product_id + ' ' + x.title + ' ' + x.price + '/' + x.old_price); });
