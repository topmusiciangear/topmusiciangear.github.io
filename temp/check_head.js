var fs = require('fs');
function headInfo(file) {
  var g = fs.readFileSync(file, 'utf8');
  var i = g.indexOf('<title');
  console.log('TITLE:', g.slice(i, g.indexOf('</title>', i) + 8));
  var j = g.indexOf('name="description"');
  console.log('DESC:', g.slice(j, g.indexOf('>', j) + 1));
  var k = g.indexOf('property="og:title"');
  console.log('OG:', g.slice(k, g.indexOf('>', k) + 1));
  console.log('---');
}
headInfo('guides/scarlett-vs-motu.html');
headInfo('guides/scarlett-vs-motu_es.html');