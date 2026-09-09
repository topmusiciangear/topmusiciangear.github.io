var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function walk(node, path) {
  if (typeof node === 'string') {
    var re = /\b(At the [A-Z]|For the [A-Z]|This the |this the |At the |For the [a-z])[^`]{0,60}/g;
    var m;
    while ((m = re.exec(node))) {
      // skip legit "At the top", "at the very", generic
      if (!/At the|For the/.test(m[0]) || /at the same time/i.test(m[0])) continue;
      if (/At the|For the/.test(m[0])) {
        // heuristic: suspicious if followed by a product noun likely (is/gives/lets)
        console.log(path + '\n  ' + JSON.stringify(node.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30)));
      }
    }
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { walk(node[k], path ? path + '.' + k : k); });
  }
}
walk(g, '');