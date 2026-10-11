var fs = require('fs');
var ids = [28, 336, 425, 483, 555, 566, 568, 569, 574, 575, 576, 611];
// 1. products.json
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var before = prods.length;
prods = prods.filter(function (p) { return ids.indexOf(p.id) < 0; });
fs.writeFileSync('data/products.json', JSON.stringify(prods, null, 2));
console.log('products: ' + before + ' -> ' + prods.length);
// 2. TEST_SHOP_BTN entries in build-guides.js (brace counting)
var src = fs.readFileSync('build-guides.js', 'utf8');
var start = src.indexOf('const TEST_SHOP_BTN = {');
if (start < 0) { console.log('BTN block not found'); process.exit(1); }
ids.forEach(function (id) {
  var key = '\n  ' + id + ': {';
  var ki = src.indexOf(key, start);
  if (ki < 0) { console.log('BTN ' + id + ': not found'); return; }
  var i = ki + key.length - 1; // at '{'
  var depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) break; }
  }
  var end = i + 1;
  if (src[end] === ',') end++;
  src = src.slice(0, ki) + src.slice(end);
  console.log('BTN ' + id + ': removed');
});
fs.writeFileSync('build-guides.js', src);
