var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

var patterns = {
  thisthe1: 'this the', thisthe2: 'This the', cadd: 'cadd',
  mG: 'mG', xenyx: 'xenyx', pJ: 'pJ', m50x: 'M50x',
  m32r: 'm32r', elgp: 'el el', stage4: 'stage 4', m8x: 'm8x'
};

function show(node, path) {
  if (typeof node === 'string') {
    Object.keys(patterns).forEach(function (k) {
      var p = patterns[k];
      var idx = node.indexOf(p);
      if (idx >= 0) {
        var s = Math.max(0, idx - 55), e = Math.min(node.length, idx + p.length + 55);
        console.log('##' + k + ' :: ' + path + '\n  ' + JSON.stringify(node.slice(s, e)));
      }
    });
  } else if (Array.isArray(node)) {
    node.forEach(function (x, i) { show(x, path + '[' + i + ']'); });
  } else if (node && typeof node === 'object') {
    Object.keys(node).forEach(function (k) { show(node[k], path ? path + '.' + k : k); });
  }
}
show(g, '');