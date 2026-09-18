var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/';
var fn = path + 'build-guides.js';
var src = fs.readFileSync(fn, 'utf8');

var m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var TEST = {}; try { TEST = Function('return {' + m[1] + '\n};')(); } catch (e) { console.error('PARSE FAIL', e.message); process.exit(1); }

// ---- price changes: id -> store -> new value (or 'REMOVE') ----
var PRICES = {
  239: { amazon: '$438.50', zzounds: '$488.00', gear4music: '£434.00', musicstore: '€398.00' },
  235: { amazon: '$999.00', zzounds: '$899.00', gear4music: '£899.00', musicstore: '€1,069.00' },
  234: { amazon: '$3,499.00', zzounds: '$3,849.00', musicstore: 'REMOVE' },
  68:  { musicstore: '€215.00', gear4music: '£179.00' },
  347: { musicstore: '€199.00' },
  345: { musicstore: '€239.00', gear4music: '£191.50' },
  302: { musicstore: '€489.00' },
  214: { gear4music: 'REMOVE', musicstore: '€360.00' },
  267: { gear4music: '£819.00' },
  193: { musicstore: '€419.00', gear4music: '£350.00' },
  364: { amazon: '$507.99', zzounds: '$1,049.99', gear4music: '£788.00', musicstore: '€798.00' },
  348: { musicstore: '€499.00' },
  175: { amazon: '$4,399.99', zzounds: '$4,399.99', gear4music: '£4,337.00', musicstore: '€4,679.00' },
  308: { musicstore: '€399.00' },
  256: { musicstore: '€849.00' },
  269: { musicstore: '€1,049.00' },
  266: { musicstore: '€1,349.00' },
  91:  { amazon: '$659.00', zzounds: '$599.00', gear4music: '£504.00', musicstore: '€635.00' },
  182: { musicstore: 'REMOVE' },
  254: { amazon: '$79.00', musicstore: 'REMOVE' },
  421: { gear4music: '£200.50', musicstore: '€215.00' },
  162: { amazon: '$749.00' },
  167: { musicstore: '€45.00' },
  389: { gear4music: '£128.00' }
};

// ---- added cfg.urls for stores moved to NA (search links) ----
var NA_URLS = {
  234: { musicstore: 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent('RCF SUB 8004-AS') },
  182: { musicstore: 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent('Universal Audio Apollo x16') },
  254: { musicstore: 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent('DJI Mic Mini') },
  214: { gear4music: 'https://www.gear4music.com/search?q=' + encodeURIComponent('Sennheiser e604 3-Pack') }
};
var NA_ADD = { 234: ['musicstore'], 182: ['musicstore'], 254: ['musicstore'], 214: ['gear4music'] };

// ---- OOS product URLs (from temp/oos_patch.json) ----
var OOSURLS = JSON.parse(fs.readFileSync(path + 'temp/oos_patch.json', 'utf8'));
delete OOSURLS['162'].musicstore;

var multis = null;

function setPrice(id, k, v) {
  var cfg = TEST[id];
  if (v === 'REMOVE') { delete cfg.prices[k]; return; }
  cfg.prices = cfg.prices || {};
  cfg.prices[k] = v;
}
function addUrl(id, k, u) {
  var cfg = TEST[id];
  (cfg.urls = cfg.urls || {})[k] = u;
}
function addNa(id, k) {
  var cfg = TEST[id];
  cfg.na = cfg.na || [];
  if (cfg.na.indexOf(k) === -1) cfg.na.push(k);
  // ensure it's not in oos (mutually exclusive intent): keep both possible
}

Object.keys(PRICES).forEach(function (id) { Object.keys(PRICES[id]).forEach(function (k) { setPrice(id, k, PRICES[id][k]); }); });
Object.keys(NA_URLS).forEach(function (id) { Object.keys(NA_URLS[id]).forEach(function (k) { addUrl(id, k, NA_URLS[id][k]); }); });
Object.keys(NA_ADD).forEach(function (id) { NA_ADD[id].forEach(function (k) { addNa(id, k); }); });
Object.keys(OOSURLS).forEach(function (id) { Object.keys(OOSURLS[id]).forEach(function (k) { addUrl(id, k, OOSURLS[id][k]); }); });

function kvjs(obj) {
  if (!obj) return null;
  var keys = Object.keys(obj);
  if (!keys.length) return null;
  return keys.map(function (k) { return k + ':' + JSON.stringify(obj[k]); }).join(',');
}
function entry(id) {
  var cfg = TEST[id];
  if (!cfg) return '  ' + id + ': {}';
  var parts = [];
  if (cfg.prices && Object.keys(cfg.prices).length) parts.push('prices:{' + kvjs(cfg.prices) + '}');
  if (cfg.urls && Object.keys(cfg.urls).length) parts.push('urls:{' + kvjs(cfg.urls) + '}');
  if (cfg.oos && cfg.oos.length) parts.push('oos:' + JSON.stringify(cfg.oos));
  if (cfg.na && cfg.na.length) parts.push('na:' + JSON.stringify(cfg.na));
  // preserve any other fields (foo, non_us, isdaw...)
  var seen = { prices: 1, urls: 1, oos: 1, na: 1 };
  Object.keys(cfg).forEach(function (k) {
    if (!seen[k]) parts.push(k + ':' + JSON.stringify(cfg[k]));
  });
  return '  ' + id + ': {' + parts.join(',') + '}';
}

var ids = Object.keys(TEST).sort(function (a, b) { return a - b; });
var block = 'const TEST_SHOP_BTN = {\n' + ids.map(entry).join(',\n') + '\n};';
src = src.replace(/const TEST_SHOP_BTN\s*=\s*\{[\s\S]*?\n *\};/, block);
fs.writeFileSync(fn, src);

// round-trip verify
var s2 = fs.readFileSync(fn, 'utf8');
var m2 = s2.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var T2 = Function('return {' + m2[1] + '\n};')();
var ok = JSON.stringify(T2) === JSON.stringify(TEST);
console.log('ROUND-TRIP OK:', ok);
if (!ok) process.exit(1);
console.log('Written block: ' + block.length + ' chars, ' + ids.length + ' entries.');
Object.keys(PRICES).forEach(function (id) {
  var p = T2[id].prices || {};
  console.log(id, '->', JSON.stringify(p));
});