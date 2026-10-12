var fs = require('fs');
var html = fs.readFileSync('guides/best-microphone.html', 'utf8');
var i = html.indexOf('var gText=');
var j = html.indexOf('</script>', i);
var code = html.slice(html.lastIndexOf('<script>', i) + 8, j);
// inject swap call INSIDE the IIFE scope
var injectAt = code.lastIndexOf('})();');
if (injectAt < 0) { console.log('NO IIFE TAIL'); process.exit(1); }
code = code.slice(0, injectAt) + ";try{doSwap('musicstore');global.__swapErr=null;}catch(e){global.__swapErr=e.message;}" + code.slice(injectAt);

function mkEl(attrs, inner) {
  return {
    attrs: attrs || {}, innerHTML: inner || '', style: {}, removed: false, inserted: null,
    getAttribute: function (k) { return (k in this.attrs) ? this.attrs[k] : null; },
    setAttribute: function (k, v) { this.attrs[k] = v; },
    querySelector: function () { return null; },
    insertAdjacentHTML: function (pos, h) { this.inserted = h; },
    remove: function () { this.removed = true; }
  };
}
var priceEl = mkEl({ 'data-price': '$99.00' }, '$99.00');
var pb = mkEl({ href: 'https://amazon.com/dp/X', 'data-store': 'amazon' }, 'Buy at Amazon');
pb.querySelector = function (sel) { return sel === '.shop-price' ? priceEl : null; };
var zPrice = mkEl({ 'data-price': '\u20AC89.00' }, '\u20AC89.00');
var zRow = mkEl({ href: 'https://www.musicstore.com/en_OE/EUR/x', 'data-store': 'musicstore' }, 'MS row');
zRow.querySelector = function (sel) { return sel === '.shop-price' ? zPrice : null; };
var ml = mkEl({}, '');
var card = mkEl({}, '');
card.querySelector = function (sel) {
  if (sel === '.shop-btn-primary') return pb;
  if (sel === '.shop-more-list') return ml;
  var m = sel.match(/\[data-store="([^"]+)"\]/);
  if (m) return m[1] === 'musicstore' ? zRow : null;
  return null;
};
ml.querySelector = function () { return null; };

global.document = { documentElement: { lang: 'en' }, querySelectorAll: function () { return [card]; } };
global.window = {};
global.XMLHttpRequest = function () { return { open: function () {}, send: function () {}, timeout: 0 }; };

try { eval(code); } catch (e) { console.log('EVAL THREW: ' + e.message); process.exit(1); }
if (global.__swapErr) { console.log('SWAP THREW: ' + global.__swapErr); process.exit(1); }
var np = pb.inserted || card.inserted || '';
var dr = ml.inserted || '';
console.log('NEWPRIMARY has MusicStore:', np.indexOf('Music Store') >= 0);
console.log('NEWPRIMARY amber:', np.indexOf('#FFC107') >= 0);
console.log('NEWPRIMARY 15px:', np.indexOf('font-size:15px') >= 0);
console.log('NEWPRIMARY price:', np.indexOf('\u20AC89.00') >= 0);
console.log('DISPROW has Amazon:', dr.indexOf('Amazon') >= 0);
console.log('DISPROW white:', dr.indexOf('color:#fff') >= 0);
console.log('DISPROW 15px:', dr.indexOf('font-size:15px') >= 0);
console.log('pb removed:', pb.removed === true);
var ok = np.indexOf('Music Store') >= 0 && np.indexOf('#FFC107') >= 0 && np.indexOf('font-size:15px') >= 0 &&
         dr.indexOf('Amazon') >= 0 && dr.indexOf('color:#fff') >= 0 && pb.removed === true;
console.log(ok ? 'SWAP-TEST PASS' : 'SWAP-TEST FAIL');
process.exit(ok ? 0 : 1);
