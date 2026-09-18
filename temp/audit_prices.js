var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/';
var src = fs.readFileSync(path + 'build-guides.js', 'utf8');

var m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var block = '{' + m[1] + '\n}';
var TEST_SHOP_BTN = Function('return ' + block)();

var prods = JSON.parse(fs.readFileSync(path + 'data/products.json', 'utf8'));
var byId = {};
prods.forEach(function (p) { byId[p.id] = p; });

var RATE = { '$': 1, '£': 1.25, '€': 1.08 };
var STORES = ['zzounds', 'amazon', 'andertons', 'gear4music', 'musicstore', 'reverb'];

function parsePrice(s) {
  if (typeof s !== 'string') return null;
  var mm = s.match(/^([$£€])([\d,]+(?:\.\d+)?)$/);
  if (!mm) return null;
  var v = parseFloat(mm[2].replace(/,/g, ''));
  if (isNaN(v)) return null;
  return { sym: mm[1], v: v, usd: v * RATE[mm[1]] };
}
function fmtUsd(u) { return '$' + (Math.round(u * 100) / 100).toLocaleString('en-US'); }

var report = [];
var W = function (sev, id, msg) { report.push({ sev: sev, id: id, msg: msg }); };

var outliers = [];
var catOutliers = [];
var fmtIssues = [];
var oosNoUrl = [];
var urlBad = [];
var priceOnNa = [];

Object.keys(TEST_SHOP_BTN).forEach(function (idS) {
  var id = idS; // keep raw key
  var cfg = TEST_SHOP_BTN[id] || {};
  var p = byId[id];
  var prices = cfg.prices || {};
  var itemP = p ? p.price : null;
  var title = p ? (p.title || '?').slice(0, 44) : '? (NOT IN CATALOG)';

  // collect numeric prices per store
  var usd = {};
  var sym = {};
  Object.keys(prices).forEach(function (k) {
    var pr = parsePrice(prices[k]);
    if (!pr) { fmtIssues.push(idS + ' [' + k + '] unparseable price: ' + prices[k]); return; }
    usd[k] = pr.usd; sym[k] = pr.sym;
    // currency vs store rule
    if (k === 'musicstore' && pr.sym !== '€') fmtIssues.push(idS + ' musicstore should be EUR but is ' + prices[k]);
    if ((k === 'zzounds' || k === 'amazon') && pr.sym !== '$') fmtIssues.push(idS + ' ' + k + ' should be USD but is ' + prices[k]);
    if ((k === 'gear4music' || k === 'andertons') && pr.sym !== '£') fmtIssues.push(idS + ' ' + k + ' should be GBP but is ' + prices[k]);
    if (pr.v >= 1000 && prices[k].indexOf(',') === -1) fmtIssues.push(idS + ' ' + k + ' missing thousands comma: ' + prices[k]);
  });

  var vals = Object.keys(usd).map(function (k) { return usd[k]; }).sort(function (a, b) { return a - b; });
  var n = vals.length;
  var med = n ? (n % 2 ? vals[(n - 1) / 2] : (vals[n / 2 - 1] + vals[n / 2]) / 2) : null;

  Object.keys(usd).forEach(function (k) {
    if (med && n >= 2) {
      var r = usd[k] / med;
      if (r > 1.5 || r < 0.55) {
        outliers.push({ id: idS, title: title, store: k, price: prices[k], usd: usd[k], medUsd: med, ratio: Math.round(r * 100) / 100, others: JSON.stringify(prices) });
      }
    }
    if (itemP && itemP > 5) {
      var cm = usd[k] / itemP;
      if (cm > 3 || cm < 0.33) {
        catOutliers.push({ id: idS, title: title, store: k, price: prices[k], catalog: itemP, ratio: Math.round(cm * 100) / 100 });
      }
    }
  });

  // price on NA store (displayed though unavailable -> inconsistent)
  (cfg.na || []).forEach(function (k) {
    if (prices[k]) priceOnNa.push(idS + ' [' + k + '] has price ' + prices[k] + ' but is in na');
  });

  // OOS stores: product URL resolution
  (cfg.oos || []).forEach(function (k) {
    var hasCfgUrl = cfg.urls && cfg.urls[k];
    var hasProdsUrl = p && p.stores && p.stores[k];
    if (!hasCfgUrl) {
      oosNoUrl.push({ id: idS, title: title, store: k, prodsUrlPresent: !!hasProdsUrl, prodsUrl: hasProdsUrl ? p.stores[k] : null });
    }
  });

  // urls that are search/home rather than product pages
  Object.keys(cfg.urls || {}).forEach(function (k) {
    var u = cfg.urls[k];
    if (!u || /\/search(?:\?|$)/i.test(u) || /\/prodsearch/i.test(u) || u.indexOf('amazon.com/?tag') === 0 || u.indexOf('/item--') === -1 && /zzounds\.com\/?$/.test(u) || /gear4music\.com\/?$/.test(u) || /andertons\.co\.uk\/?$/.test(u) || /musicstore\.com\/en_OE\/EUR\/?$/.test(u)) {
      urlBad.push(idS + ' [' + k + '] url looks generic: ' + u);
    }
  });
});

function emit(label, list, fmt) {
  console.log('\n== ' + label + ' == (' + list.length + ')');
  list.slice(0, 400).forEach(function (x) { console.log(fmt(x)); });
}

outliers.sort(function (a, b) { return b.ratio / b.usd - a.ratio / a.usd; });
emit('OUTLIER store price vs median (ratio>1.5 or <0.55)', outliers, function (x) { return x.id + ' ' + x.title + ' | ' + x.store + '=' + x.price + ' (med ~' + fmtUsd(x.medUsd) + ', ratio ' + x.ratio + ') | others: ' + x.others; });

catOutliers.sort(function (a, b) { return b.ratio - a.ratio; });
emit('CATALOG mismatch (store price vs products.json price >3x or <0.33x)', catOutliers, function (x) { return x.id + ' ' + x.title + ' | ' + x.store + '=' + x.price + ' (catalog $' + x.catalog + ', ratio ' + x.ratio + ')'; });

emit('FORMAT issues (currency store mismatch / missing comma / unparseable)', fmtIssues, function (x) { return x; });

emit('OOS store WITHOUT cfg.urls (will link to home/search)', oosNoUrl, function (x) { return x.id + ' ' + x.title + ' | oos:' + x.store + (x.prodsUrlPresent ? '  [productss.json HAS url!] ' + (x.prodsUrl || '').slice(0, 90) : '  [no url known]'); });

emit('cfg.urls that look generic (search/home)', urlBad, function (x) { return x; });

emit('PRICE on NA store', priceOnNa, function (x) { return x; });

fs.writeFileSync(path + 'temp/audit_prices_report.json', JSON.stringify(report, null, 1));
console.log('\nTotal TEST_SHOP_BTN entries: ' + Object.keys(TEST_SHOP_BTN).length);