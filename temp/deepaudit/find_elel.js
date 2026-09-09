var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var hits = [];
function walk(node, path) {
  if (typeof node === 'string') {
    var idx = node.indexOf('el el');
    if (idx >= 0) hits.push(path + ' :: ' + JSON.stringify(node.slice(Math.max(0, idx - 10), idx + 20)));
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { walk(node[k], path ? path + '.' + k : k); });
  }
}
walk(g, '');
console.log('total fields:', hits.length);
hits.forEach(function (h) { console.log(h); });