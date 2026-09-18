var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/';
var src = fs.readFileSync(path + 'build-guides.js', 'utf8');
var m = src.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var TEST_SHOP_BTN = Function('return {' + m[1] + '\n};')();
var prods = JSON.parse(fs.readFileSync(path + 'data/products.json', 'utf8'));
var byId = {}; prods.forEach(function (p) { byId[p.id] = p; });

function rawUrl(u) {
  if (!u) return null;
  var t = u;
  var a = u.match(/awin1\.com\/cread\.php\?[^]*?ued=([^&\s]+)/);
  if (a) { try { t = decodeURIComponent(a[1]); } catch (e) {} }
  var z = u.match(/anrdoezrs\.net\/[^]*?\?url=([^&\s]+)/);
  if (z) { try { t = decodeURIComponent(z[1]); } catch (e) {} }
  var p = u.match(/andertonsmusiccompany\.pxf\.io\/[^]*?\?u=([^&\s]+)/);
  if (p) { try { t = decodeURIComponent(p[1]); } catch (e) {} }
  return t;
}
function generic(u, store) {
  if (!u) return false;
  if (store === 'zzounds') {
    var code = u.replace(/.*item--/, '');
    if (/[\s+]/.test(code)) return true;
    return false;
  }
  return false;
}

var patch = {};        // id -> {urls:{store:{set:true/keep...}}}
var suspicious = [];
var already = [];

Object.keys(TEST_SHOP_BTN).forEach(function (id) {
  var cfg = TEST_SHOP_BTN[id] || {};
  var p = byId[id];
  if (!p) return;
  (cfg.oos || []).forEach(function (k) {
    if (cfg.urls && cfg.urls[k]) { already.push(id + ':' + k); return; }
    var u = p.stores && p.stores[k];
    if (!u) return;
    var raw = rawUrl(u);
    if (!raw) return;
    if (generic(raw, k)) { suspicious.push(id + ' ' + (p.title||'').slice(0,40) + ' | ' + k + ' | ' + raw); return; }
    patch[id] = patch[id] || {};
    patch[id][k] = raw;
  });
});

console.log('=== Entry (id -> store -> raw product URL) to ADD as cfg.urls ===');
Object.keys(patch).sort(function(a,b){return a-b;}).forEach(function (id) {
  console.log(id + ': ' + Object.keys(patch[id]).join(',') + ' -> ' + JSON.stringify(patch[id]));
});
console.log('\n=== ' + Object.keys(patch).length + ' products to patch ===');
console.log('\n=== SUSPICIOUS GENERIC OOS URLS (skip, verify manually): ' + suspicious.length + ' ===');
suspicious.forEach(function (s) { console.log(s); });
console.log('\n=== already have cfg.urls for that store: ' + already.length + ' ===');

fs.writeFileSync(path + 'temp/oos_patch.json', JSON.stringify(patch, null, 1));
fs.writeFileSync(path + 'temp/oos_suspicious.txt', suspicious.join('\n'));