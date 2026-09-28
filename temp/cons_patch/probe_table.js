var fs = require('fs');
var dir = 'C:/Users/Daniel/projects/topmusiciangear/guides/';

function parse(t) {
  var r = {};
  r.tables = 0;
  var re = /<table class="guide-comp-table"[^>]*>(<thead>.*?<\/thead>)/g;
  var m;
  var results = [];
  while ((m = re.exec(t))) {
    r.tables++;
    var head = m[1];
    var ths = head.match(/<th[^>]*>([^<]*)<\/th>/g) || [];
    var headers = ths.map(function (x) { return x.replace(/<[^>]+>/g, '').trim(); });
    var bestFor = '';
    var bfMatch = t.slice(m.index).match(/<tr><td class="label">Best For<\/td>((?:<td[^>]*>[^<]*<\/td>)+)/);
    if (bfMatch) bestFor = bfMatch[1];
    results.push({ headers: headers, bestFor: bestFor });
  }
  return { tables: r.tables, results: results };
}

['portable-interfaces.html', 'portable-interfaces_es.html'].forEach(function (name) {
  var t = fs.readFileSync(dir + name, 'utf8');
  console.log('======== ' + name + ' ========');
  var p = parse(t);
  console.log('compare tables: ' + p.tables);
  p.results.forEach(function (r, i) {
    console.log('--- table#' + i + ' colCount=' + r.headers.length + ' ---');
    console.log('headers: ' + r.headers.join(' | '));
    if (r.bestFor) {
      var cells = r.bestFor.match(/<td[^>]*>([^<]*)<\/td>/g) || [];
      cells.forEach(function (c, j) {
        var v = c.replace(/<[^>]+>/g, '').trim();
        console.log('  cell[' + j + ']: ' + v);
      });
    } else {
      console.log('  NO Best For row');
    }
  });
  console.log('product cards: ' + (t.split('guide-product-card-img').length - 1));
  console.log('verdict cols : ' + (t.split('verdict-col').length - 1));
  console.log('');
});
