var fs = require('fs');
var s = fs.readFileSync('build-guides.js', 'utf8');
// print current primary wordmark snippets
var pats = ['SHOP_LOGO_STYLE.hollyland', 'isDaw ?', 'isPlugins ?', 'primaryStoreKey]||'];
pats.forEach(function (p) {
  var i = s.indexOf(p);
  console.log('### ' + p + ' ###');
  console.log(JSON.stringify(s.slice(Math.max(0, i - 40), i + 260)));
});
