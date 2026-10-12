var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-electric-guitar'; })[0];
(function walk(v, path) {
  if (typeof v === 'string') {
    if (/\(\$220\)|\(\$430\)/.test(v)) {
      var m = v.match(/.{0,120}\(\$(220|430)\).{0,40}/);
      console.log(path + ' :: ...' + m[0].replace(/\s+/g, ' '));
    }
    return;
  }
  if (Array.isArray(v)) v.forEach(function (x, i) { walk(x, path + '[' + i + ']'); });
  else if (v && typeof v === 'object') Object.keys(v).forEach(function (k) { walk(v[k], path ? path + '.' + k : k); });
})(g, '');
