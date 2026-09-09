var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var count = {};
function walk(node, path) {
  if (typeof node === 'string') {
    if (node.indexOf('(2026)') >= 0) count[path] = (count[path] || 0) + 1;
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { walk(node[k], path ? path + '.' + k : k); });
  }
}
walk(g, '');
Object.keys(count).sort().forEach(function (k) { console.log(k.padEnd(34), count[k]); });
console.log('total fields with (2026):', Object.keys(count).length);