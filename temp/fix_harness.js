var fs = require('fs');
var s = fs.readFileSync('temp/test_geo_run.js', 'utf8');
s = s.split("if (m) return m[1] === 'musicstore' ? fakeRow() : null;").join("if (m) return m[1] === 'musicstore' ? fakeRow(m[1], 'https://musicstore.com/p') : null;");
s = s.split("XHRS.forEach(function (x) { if (x.onerror) x.onerror(); if (x.ontimeout) x.ontimeout(); });").join("for (var k = 0; k < 6; k++) { XHRS.forEach(function (x) { if (!x._f) { x._f = 1; if (x.onerror) x.onerror(); } }); }");
fs.writeFileSync('temp/test_geo_run.js', s);
console.log('harness fixed');
