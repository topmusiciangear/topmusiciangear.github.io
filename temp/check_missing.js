var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
var m = s.match(/const TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n *\};/);
var T = Function('return {' + m[1] + '\n};')();
var prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var byId = {}; prods.forEach(function (p) { byId[p.id] = p; });

function walk(d, cb) { fs.readdirSync(d, { withFileTypes: true }).forEach(function (e) { var p = d + '/' + e.name; if (e.isDirectory()) walk(p, cb); else if (/\.html$/.test(e.name)) cb(p); }); }

var ids = [182, 214, 234, 254, 336, 374, 377, 468, 162];
ids.forEach(function (id) {
  var t = T[id] || {};
  console.log('\n== ' + id + ' ' + (byId[id] ? byId[id].title : '?' ) + ' ==');
  console.log('  oos:', JSON.stringify(t.oos), ' na:', JSON.stringify(t.na));
  console.log('  cfg.urls:', JSON.stringify(t.urls));
  // find a page containing this product id marker (its guide-section-buy) and show first oos row
  var found = null;
  walk('guides', function (p) {
    var html = fs.readFileSync(p, 'utf8');
    // locate a button section for this product: search for the anchor to a store-specific subpage or product name? simpler: find data-store rows near title
    if (byId[id]) {
      var nm = byId[id].title.split(' ').slice(0, 2).join(' ');
      if (html && html.indexOf(nm) > -1 && !found && !/\.json$/.test(p) && html.indexOf('guide-section-buy') > -1) found = p;
    }
  });
  if (found) {
    var html = fs.readFileSync(found, 'utf8');
    // find the URL used for musicstore/gear4music/pluginboutique "na" or "oos" row: search for 'SearchText' or 'pluginboutique' or 'gear4music' hrefs
    var hits = [];
    ['SearchText', 'pluginboutique', 'gear4music.com', 'andertons.co.uk'].forEach(function (k) {
      var idx = html.indexOf(k);
      if (idx > -1) hits.push(k + '::' + JSON.stringify(html.slice(Math.max(0, idx - 90), idx + 90)));
    });
    console.log('  sample page:', found);
    hits.slice(0, 4).forEach(function (h) { console.log('   ', h); });
  } else console.log('  sample page: none');
});