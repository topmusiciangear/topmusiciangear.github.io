var fs = require('fs');
var guides = [
  'guides/ai-tools-plugins_es.html',
  'guides/beatmaker-plugins_es.html',
  'guides/j48-vs-rndi_es.html',
  'guides/di-box_es.html',
  'guides/mixing-plugins_es.html'
];
guides.forEach(function(g) {
  var h = fs.readFileSync(g, 'utf8');
  var re = /href="(https:\/\/www\.pluginboutique\.com\/product[^"]+)"/g;
  var m;
  var total = 0, ok = 0;
  while (m = re.exec(h)) {
    total++;
    if (m[1].indexOf('a_aid=') >= 0) ok++;
  }
  console.log(g + ': ' + ok + '/' + total + ' PB product links with affiliate');
});
