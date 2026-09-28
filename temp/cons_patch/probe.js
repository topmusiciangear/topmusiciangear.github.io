var fs = require('fs');
var dir = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
function count(name, pat) { var t = fs.readFileSync(dir + name, 'utf8'); return t.split(pat).length - 1; }
function show(name) {
  var t = fs.readFileSync(dir + name, 'utf8');
  console.log('==== ' + name + ' ====');
  console.log('product cards        : ' + count(name, 'guide-product-card-img'));
  console.log('verdict cols         : ' + count(name, 'verdict-col'));
  console.log('comparison tables    : ' + count(name, 'guide-comp-table'));
  console.log('comparison thead cols: ');
  var re = /<thead><tr>(<th[^>]*><\/th>)?((?:<th[^>]*>[^<]*<\/th>)+)/g;
  var m, i = 0;
  while ((m = re.exec(t))) {
    var ms = m[2].match(/<th[^>]*>([^<]*)<\/th>/g);
    var names = ms ? ms.map(function(x){return x.replace(/<[^>]+>/g,'').trim()}) : [];
    console.log('  table#' + i + ' cols=' + names.length + ' => ' + names.join(' | '));
    i++;
  }
}
['premium-interfaces.html', 'premium-interfaces_es.html', 'portable-interfaces.html', 'portable-interfaces_es.html'].forEach(show);
