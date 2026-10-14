var fs = require('fs');
var c = fs.readFileSync('guides/best-pa-speakers.html', 'utf8');
['At $599, $899, and $999 each', '$999 each — $400 more', 'At $599, $899, and $999 each — and the ZLX-12P-G2 at $599 each'].forEach(function (p) {
  var i = c.indexOf(p); console.log((i >= 0 ? 'FOUND' : 'MISSING') + ' :: ' + p + (i >= 0 ? ' @' + i : ''));
});
var e = fs.readFileSync('guides/best-pa-speakers_es.html', 'utf8');
['A $599, $899 y $999 cada uno', 'unos $400 más'].forEach(function (p) {
  console.log((e.indexOf(p) >= 0 ? 'FOUND-ES' : 'MISSING-ES') + ' :: ' + p);
});
process.exit(0);