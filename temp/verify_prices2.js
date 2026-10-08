const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/tracking-headphones.html', 'utf8');
function blockPrices(name) {
  const i = s.indexOf('verdict-product-name">' + name);
  // buy block is BEFORE verdict; find section buy block instead: search product name in section then following shop-more-list
  const j = s.indexOf(name);
  const seg = s.slice(j, j + 12000);
  const prices = [...seg.matchAll(/data-price='([^']*)'/g)].map(m => m[1]);
  console.log(name, '=>', JSON.stringify(prices.slice(0, 6)));
}
blockPrices('HD 280');
blockPrices('NDH 20');
blockPrices('ATH-M40x');
