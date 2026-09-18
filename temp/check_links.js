var fs = require('fs');
function html(p) { return fs.readFileSync(p, 'utf8'); }
function finds(page, pat) { var h = html(page), out = [], i = 0; while ((i = h.indexOf(pat, i)) > -1) { out.push(i); i += pat.length; } return out; }

// locate product sections by unique strings
var checks = [
  ['guides/best-compact-mixers.html', ['Mackie', 'MobileMix']],
  ['guides/best-monitors-for-small-rooms.html', ['KH 810', 'Neumann']]
];
checks.forEach(function (c) {
  var h = html(c[0]);
  console.log('\n### ' + c[0]);
  // find first guide-section-buy and the following 2000 chars
  var b = h.indexOf('guide-section-buy');
  var sec = h.slice(b, b + 4000);
  var links = sec.match(/href="([^"]+)"/g) || [];
  links.slice(0, 14).forEach(function (l) { console.log('   ', l.slice(6, 120)); });
});