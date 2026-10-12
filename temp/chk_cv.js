var guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-electric-guitar'; })[0];
(function walk(v, path) {
  if (typeof v === 'string') {
    if (v.indexOf('$430') >= 0) {
      var m = v.match(/.{0,120}\$430.{0,40}/);
      console.log(path + ' :: ...' + m[0].replace(/\s+/g, ' '));
    }
    return;
  }
  if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
})(g, '');
