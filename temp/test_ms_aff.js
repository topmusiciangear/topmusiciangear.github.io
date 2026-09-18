var fs = require('fs');
var s = fs.readFileSync('js/shop-buttons.js', 'utf8');
var products = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');

function grab(n) {
  var st = s.indexOf('function ' + n + '(');
  var i = s.indexOf('{', st);
  var d = 0, j = i;
  for (; j < s.length; j++) { var c = s[j]; if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; } }
  return s.slice(st, j + 1);
}

function entryFor(id) {
  var btn = s.slice(s.indexOf('const TEST_SHOP_BTN = {'), s.indexOf('\n};', s.indexOf('const TEST_SHOP_BTN = {')));
  var m = btn.match(new RegExp('\\b' + id + ':\\s*\\{[^\\r\\n]*\\}'));
  if (!m) throw new Error('no entry for ' + id);
  return m[0].slice(m[0].indexOf('{'));
}

var code = [
  'const wrapAffiliate = ' + grab('wrapAffiliate'),
  'const normalizeMusicStore = ' + grab('normalizeMusicStore'),
  'const normalizeMusicStoreInner = ' + grab('normalizeMusicStoreInner'),
  'const shortTitle = ' + grab('shortTitle'),
  'const wrapAndertons = ' + grab('wrapAndertons'),
  'const ensurePbAff = ' + grab('ensurePbAff'),
  'const getResolvedStores = ' + grab('getResolvedStores'),
  'const C249 = ' + entryFor('249') + ';',
  'const C254 = ' + entryFor('254') + ';',
  '[["249", C249], ["254", C254]].forEach(function (pair) {',
  '  var id = pair[0], cfg = pair[1];',
  '  var p = products.find(function (x) { return String(x.id) === id; });',
  '  var st = getResolvedStores(p);',
  '  var k = "musicstore";',
  '  var u = (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : st[k];',
  '  var href = u ? wrapAffiliate(k, u) : "(no resolved url)";',
  '  console.log("ID " + id + " | " + p.title);',
  '  console.log("  products.json stores.musicstore   = " + (p.stores.musicstore || "(none)"));',
  '  console.log("  cfg.urls.musicstore               = " + ((cfg.urls && cfg.urls[k]) || "(none)"));',
  '  console.log("  getResolvedStores.musicstore      = " + (st[k] || "(none)"));',
  '  console.log("  FINAL row href (wrapAffiliate)    = " + href);',
  '  console.log("");',
  '});'
].join('\n');

eval(code);