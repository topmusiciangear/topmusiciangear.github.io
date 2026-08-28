const fs = require('fs');
let code = fs.readFileSync('build-guides.js', 'utf8');

// Find the TEST_SHOP_BTN function boundaries
const marker = 'function TEST_SHOP_BTN(';
const start = code.indexOf(marker);

// Find the return statement and the closing
const returnIdx = code.indexOf('return btns', start);
const endBrace = code.indexOf('}', returnIdx) + 1;

const oldFunc = code.substring(start, endBrace);

const newFunc = `function TEST_SHOP_BTN(id, opts) {
  opts = opts || {};
  var p = PRODUCTS.find(function(x){ return x.id === id; });
  if (!p) return '';
  var prices = {
    402: {amazon:'$1,999',zzounds:'$1,999',gear4music:'$2,099',reverb:'Check price'},
    403: {amazon:'$3,999',zzounds:'$3,999',gear4music:'$3,799',reverb:'Check price'},
    406: {amazon:'$1,599',zzounds:'$1,599',gear4music:'$1,499',reverb:'Check price'},
    408: {amazon:'$1,400',zzounds:'$1,399',gear4music:'$1,349',reverb:'Check price'},
    410: {amazon:'$1,369',zzounds:'$1,369',gear4music:'$1,299',reverb:'Check price',andertons:'Check price',musicstore:'Check price'},
    412: {amazon:'$2,799',reverb:'Check price',musicstore:'Check price'},
    413: {amazon:'$1,899',reverb:'Check price',musicstore:'Check price'},
    414: {amazon:'$5,199',reverb:'Check price',gear4music:'Check price',musicstore:'Check price'},
    415: {reverb:'Check price',musicstore:'Check price'},
    416: {amazon:'$25,490',reverb:'Check price',musicstore:'Check price'},
    417: {amazon:'$5,999',reverb:'Check price',gear4music:'Check price',musicstore:'Check price'}
  };
  var stores = p.stores || {};
  var oosList = (p.oos || '').split(',').map(function(s){return s.trim();});
  var excludeList = p.excludeStores || [];
  var btns = '';
  var isPlugin = opts.isPlugin || false;
  var storeConfig = [
    {key:'amazon',label:'Amazon',flag:'\\u{1F1FA}\\u{1F1F8}'},
    {key:'zzounds',label:'zZounds',flag:'\\u{1F1FA}\\u{1F1F8}',sub:'Easy Payment Plans'},
    {key:'reverb',label:'Reverb',flag:'\\u{1F30D}',sub:'New & Used Market'},
    {key:'gear4music',label:'Gear4music',flag:'\\u{1F1EC}\\u{1F1E7}',sub:'Fast UK Delivery'},
    {key:'andertons',label:'Andertons',flag:'\\u{1F1EC}\\u{1F1E7}',sub:'Expert Support'},
    {key:'musicstore',label:'Music Store',flag:'\\u{1F1EA}\\u{1F1FA}',sub:'3-Year Warranty'}
  ];
  if (isPlugin) {
    storeConfig = [
      {key:'pluginboutique',label:'Plugin Boutique',flag:'\\u{1F30D}',sub:'Plugin Marketplace'}
    ];
  }
  storeConfig.forEach(function(s) {
    if (excludeList.indexOf(s.key) > -1) return;
    var hasUrl = stores[s.key] && stores[s.key].length > 5;
    var price = (prices[id] && prices[id][s.key]) ? prices[id][s.key] : '';
    var isOOS = oosList.indexOf(s.key) > -1 || (s.key !== 'reverb' && !price && hasUrl);
    var cls = 'shop-btn shop-btn-sm';
    var sub = s.sub || '';
    if (isOOS) {
      cls += ' shop-btn-oos';
      sub = 'Out of stock';
    }
    if (s.key === (opts.primaryStore || 'amazon')) cls += ' shop-btn-primary';
    btns += '<a href="' + (hasUrl ? stores[s.key] : '#') + '" class="' + cls + '" target="_blank" rel="nofollow noopener">';
    btns += '<span class="shop-btn-flag">' + s.flag + '</span> ';
    btns += '<span class="shop-btn-label">' + s.label + '</span>';
    if (sub) btns += ' <span class="shop-btn-sub">' + sub + '</span>';
    if (price && !isOOS) btns += ' <span class="shop-btn-price">' + price + '</span>';
    btns += '</a>';
  });
  return btns;
}`;

code = code.substring(0, start) + newFunc + code.substring(endBrace);
fs.writeFileSync('build-guides.js', code, 'utf8');
console.log('TEST_SHOP_BTN updated');
console.log('New function length:', newFunc.length, 'chars');
