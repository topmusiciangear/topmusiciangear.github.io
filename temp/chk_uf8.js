var prods = require('../data/products.json');
var f = prods.filter(function (v) { return /UF8/i.test(v.title); });
console.log(JSON.stringify(f.map(function (x) { return { id: x.id, title: x.title, title_es: x.title_es, zz: x.stores && x.stores.zzounds, img: !!x.img }; }), null, 1));
