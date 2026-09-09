var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var g = JSON.parse(fs.readFileSync(path, 'utf8'));
var YEAR = /\(2026\)/g;
var n = 0;
var TITLEISH = /^title/i;
function walk(o) {
  if (Array.isArray(o)) { o.forEach(walk); return; }
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(function (k) {
      var v = o[k];
      if (typeof v === 'string' && TITLEISH.test(k)) {
        var m = v.match(YEAR);
        if (m) { n += m.length; o[k] = v.replace(YEAR, '').replace(/  +/g, ' '); }
      }
      walk(v);
    });
  }
}
g.forEach(walk);
fs.writeFileSync(path, JSON.stringify(g, null, 2), 'utf8');
var c = JSON.stringify(g);
console.log('removed ' + n);
console.log('leftover (2026): ' + (c.match(/\(2026\)/g) || []).length);
console.log('JSON OK: ' + (c.length > 0));