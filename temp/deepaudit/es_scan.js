var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function walk(node, path) {
  if (typeof node === 'string') {
    if (node.indexOf('cada uno') >= 0 || node.indexOf('por par') >= 0 || node.indexOf(' el par ') >= 0) {
      console.log(path + '\n  ' + JSON.stringify(node.slice(0, 200)));
    }
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { walk(node[k], path ? path + '.' + k : k); });
  }
}
walk(g, '');