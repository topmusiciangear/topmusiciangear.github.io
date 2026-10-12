var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/';
var guides = JSON.parse(fs.readFileSync(P + 'data/guides.json', 'utf8'));
var fixes = [];
function walk(v, path, gname, fn) {
  if (typeof v === 'string') { fn(v, path, gname); return; }
  if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']', gname, fn); });
  else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k, gname, fn); });
}
// 1. double spaces
guides.forEach(function (g) {
  var gname = g.slug || g.id;
  walk(g, '', gname, function (t, path) {
    if (/(^|[^ ])  +[^ ]/.test(t)) fixes.push({ g: gname, path: path, kind: 'DBLSPACE', sample: t.match(/.{0,50}  +.{0,50}/)[0].replace(/\s+/g, ' ') });
  });
});
// 2. year leftovers
guides.forEach(function (g) {
  var gname = g.slug || g.id;
  walk(g, '', gname, function (t, path) {
    if (/\(2026\)/.test(t)) fixes.push({ g: gname, path: path, kind: 'YEAR', sample: t.match(/.{0,40}\(2026\).{0,20}/)[0] });
  });
});
// 3. em-dash + period
guides.forEach(function (g) {
  var gname = g.slug || g.id;
  walk(g, '', gname, function (t, path) {
    var m = t.match(/.{0,60}[—–]\s*\.\s*.{0,60}/);
    if (m) fixes.push({ g: gname, path: path, kind: 'DASHPERIOD', sample: m[0].replace(/\s+/g, ' ') });
  });
});
console.log('TOTAL:' + fixes.length);
fixes.forEach(function (f) { console.log(f.kind + ' | ' + f.g + ' | ' + f.path + ' | ' + f.sample.slice(0, 160)); });
