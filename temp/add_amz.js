var fs = require('fs');
var manual = JSON.parse(fs.readFileSync('data/manual-deals.json', 'utf8'));
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
function prod(id) { return prods.find(function (p) { return p.id === id; }); }
var today = new Date().toISOString().slice(0, 10);
var adds = [
  {
    product_id: 26, title: prod(26).title, title_es: prod(26).title_es,
    price: 98, old_price: 114.99, currency: '$', store: 'amazon',
    store_url: 'https://www.amazon.com/dp/B000AJIF4E',
    img: prod(26).img, badge_en: 'Save $17', badge_es: 'Ahorra $17',
    desc: 'Studio legend at a limited-time $98 (list $114.99) on Amazon.',
    desc_es: 'Leyenda de estudio a $98 por tiempo limitado (lista $114.99) en Amazon.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 56, title: prod(56).title, title_es: prod(56).title_es,
    price: 149.99, old_price: 199, currency: '$', store: 'amazon',
    store_url: 'https://www.amazon.com/dp/B0011UB9CQ',
    img: prod(56).img, badge_en: 'Save $49', badge_es: 'Ahorra $49',
    desc: 'Open-back reference, $149.99 (was $199) on Amazon.',
    desc_es: 'Referencia abierta, $149.99 (era $199) en Amazon.',
    date_added: today, source: 'manual'
  },
  {
    product_id: 422, title: prod(422).title, title_es: prod(422).title_es,
    price: 272.91, old_price: 499.95, currency: '$', store: 'amazon',
    store_url: 'https://www.amazon.com/dp/B00004SY4H',
    img: prod(422).img, badge_en: 'Save $227', badge_es: 'Ahorra $227',
    desc: 'Audiophile classic at $272.91 (list $499.95) on Amazon.',
    desc_es: 'Clásico audiófilo a $272.91 (lista $499.95) en Amazon.',
    date_added: today, source: 'manual'
  }
];
adds.forEach(function (d) {
  if (!manual.some(function (x) { return x.title === d.title && x.store === d.store; })) manual.push(d);
  else console.log('already: ' + d.title);
});
fs.writeFileSync('data/manual-deals.json', JSON.stringify(manual, null, 2) + '\n');
console.log('manual total: ' + manual.length);
