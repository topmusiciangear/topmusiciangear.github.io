var fs = require('fs');
var A = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var MAP = {
  'neumann mt 48': 'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
  'apollo x8p': 'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
  'apogee symphony': 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
  'audient oria': 'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
var O = [];
var hits = 0, changed = 0;

function low(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
function same(u1, u2) {
  var a = low(u1), b = low(u2);
  a = a.replace(/\?.*$/, ''); b = b.replace(/\?.*$/, '');
  return a === b;
}
function walk(list, base) {
  if (!Array.isArray(list)) return;
  list.forEach(function (p, pi) {
    var name = String(p.name || p.title || p.productName || '');
    var key = null;
    Object.keys(MAP).forEach(function (k) { if (low(name).indexOf(k) >= 0) key = k; });
    if (!key) return;
    var imgKey = null;
    if (p.image !== undefined) imgKey = 'image';
    else if (p.imageUrl !== undefined) imgKey = 'imageUrl';
    else if (p.img !== undefined) imgKey = 'img';
    if (!imgKey) { return; }
    var cur = String(p[imgKey] || '');
    var tgt = MAP[key];
    hits++;
    O.push(base + '[' + pi + '] ' + JSON.stringify(name) + ' : ' + String(cur) + '  ->  ' + tgt);
    if (same(cur, tgt)) { O.push('    (already set)'); return; }
    p[imgKey] = tgt;
    if (p.image_es !== undefined) p.image_es = tgt;
    changed++;
  });
}

A.forEach(function (g, gi) {
  var slug = String(g.slug || g.id || '');
  if (slug !== 'premium-interfaces') return;
  O.push('## premium-interfaces idx=' + gi);
  Object.keys(g).forEach(function (k) {
    var v = g[k];
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v) && v.length && (v[0].image !== undefined || v[0].imageUrl !== undefined || v[0].img !== undefined)) {
      walk(v, '  ' + k + '.');
    }
    if (v.rows && Array.isArray(v.rows)) {
      v.rows.forEach(function (r, ri) {
        if (!r || typeof r !== 'object') return;
        Object.keys(r).forEach(function (rk) {
          var rv = r[rk];
          if (Array.isArray(rv) && rv.length && (rv[0].image !== undefined || rv[0].imageUrl !== undefined || rv[0].img !== undefined)) {
            walk(rv, '  ' + k + '.rows[' + ri + '].' + rk + '.');
          }
        });
      });
    }
    Object.keys(v).forEach(function (sk) {
      var sv = v[sk];
      if (Array.isArray(sv) && sv.length && (sv[0].image !== undefined || sv[0].imageUrl !== undefined || sv[0].img !== undefined)) {
        walk(sv, '  ' + k + '.' + sk + '.');
      }
    });
  });
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', JSON.stringify(A, null, 2), 'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/imgfix_report.txt', O.join('\n') + '\nTOTAL hits=' + hits + ' changed=' + changed, 'utf8');
console.log('hits=' + hits + ' changed=' + changed);
