var fs = require('fs');
function walk(d, cb) { fs.readdirSync(d, { withFileTypes: true }).forEach(function (e) { var p = d + '/' + e.name; if (e.isDirectory()) walk(p, cb); else if (/\.html$/.test(e.name)) cb(p); }); }
var pages = [];
walk('guides', function (p) { pages.push(fs.readFileSync(p, 'utf8')); });

var lines = fs.readFileSync('temp/oos_export.txt', 'utf8').split('\n').filter(function (l) { return l.trim(); }).slice(1);
var missing = [];
lines.forEach(function (l) {
  var url = l.split('\t')[1];
  if (!url || /no url/.test(url)) return;
  var q; try { q = decodeURIComponent(url.slice(url.lastIndexOf('/') + 1)); } catch (e) { q = url; }
  if (/shop$|^\/|\.htm$|^$/.test(q)) q = url; // fall back to last path segment if it looks generic
  var inPages = pages.some(function (s) { return s.indexOf(q) > -1 || s.indexOf(url) > -1; });
  if (!inPages) missing.push(l);
});
console.log('URLs NOT found in any page:');
missing.forEach(function (m) { console.log(m); });
console.log('missing count:', missing.length);