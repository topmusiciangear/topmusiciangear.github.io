var fs = require('fs');
var products = JSON.parse(fs.readFileSync('data/products.json','utf8'));

var stores = {
  gear4music: [],
  musicstore: [],
  amazon: [],
  andertons: [],
  zzounds: [],
  reverb: [],
  pluginboutique: []
};

products.forEach(function(p) {
  if (!p.stores) return;
  Object.keys(stores).forEach(function(k) {
    if (p.stores[k]) {
      stores[k].push({ id: p.id, title: p.title, url: p.stores[k] });
    }
  });
});

Object.keys(stores).forEach(function(k) {
  console.log('\n=== ' + k + ' (' + stores[k].length + ' URLs) ===');
  stores[k].slice(0, 5).forEach(function(item) {
    console.log('  #' + item.id + ' ' + item.url.substring(0, 120));
  });
  if (stores[k].length > 5) console.log('  ... and ' + (stores[k].length - 5) + ' more');
});

// Check which ones already have affiliate params
console.log('\n=== AFFILIATE PARAM CHECK ===');
Object.keys(stores).forEach(function(k) {
  var withAff = stores[k].filter(function(item) {
    var u = item.url;
    if (k === 'amazon') return u.indexOf('tag=') >= 0;
    if (k === 'andertons') return u.indexOf('irgwc=') >= 0;
    if (k === 'pluginboutique') return u.indexOf('a_aid=') >= 0;
    if (k === 'zzounds') return u.indexOf('anrdoezrs.net') >= 0;
    if (k === 'reverb') return u.indexOf('awin1.com') >= 0;
    if (k === 'musicstore') return u.indexOf('awin1.com') >= 0;
    if (k === 'gear4music') return u.indexOf('awin1.com') >= 0 || u.indexOf('affid') >= 0;
    return false;
  });
  console.log(k + ': ' + withAff.length + '/' + stores[k].length + ' already have affiliate params');
});
