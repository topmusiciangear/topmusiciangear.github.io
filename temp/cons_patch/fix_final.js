var fs = require('fs');
var P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var A = JSON.parse(fs.readFileSync(P, 'utf8'));
var L = [];
var IMG = {
  'neumann mt 48': 'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
  'apollo x8p': 'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
  'apogee symphony': 'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
  'audient oria': 'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
var ES = {
  'voz/inst con vintage 610, streaming': 'Vocal/inst with Vintage 610, streaming',
  'bajo coste alto rendimiento, ess': 'Budget high-end performance, ESS',
  '2 headphone, adat, id scroll': '2 headphone, ADAT, iD scroll',
  'podcast/streaming smartgain, loopback': 'Podcast/streaming Smartgain, loopback',
  'vocal+76 compressor, midi': 'Vocal+76 compressor, MIDI'
};
var norm = function (s) { return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, ' ').trim(); };
var hits = 0, applied = 0, cells = 0;

function matchImg(name) {
  var n = norm(name);
  for (var k in IMG) { if (n.indexOf(k) >= 0) return k; }
  return null;
}

function scan(o, path) {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) {
    for (var i = 0; i < o.length; i++) scan(o[i], path + '[' + i + ']');
    return;
  }
  var nm = o.name || o.title || o.productName || '';
  if (nm && typeof nm === 'string') {
    var mk = matchImg(nm);
    if (mk) {
      hits++;
      var tgt = IMG[mk];
      var keys = Object.keys(o).filter(function (k) { return /image|img|photo|pic|thumb/i.test(k); });
      L.push(path + ' | ' + JSON.stringify(nm) + ' | imgKeys=[' + keys.join(',') + ']');
      var done = false;
      for (var j = 0; j < keys.length; j++) {
        if (typeof o[keys[j]] !== 'string') continue;
        o[keys[j]] = tgt;
        L.push('   SET ' + keys[j] + ' <- ' + tgt.slice(0, 60));
        applied++; done = true;
      }
      if (!done) { o.image = tgt; L.push('   CREATED image <- ' + tgt.slice(0, 60)); applied++; }
    }
  }
  for (var key in o) {
    var v = o[key];
    if (v && typeof v === 'object') scan(v, path + '.' + key);
  }
}

function fixCells(t, label) {
  if (!t || typeof t !== 'object') return;
  if (Array.isArray(t.rows)) {
    t.rows.forEach(function (row, ri) {
      var cs = row.cells || row.values || [];
      cs.forEach(function (c, ci) {
        if (!c || typeof c !== 'object') return;
        var cur = String(c.value === undefined ? '' : c.value);
        var f = ES[norm(cur)];
        if (f) { L.push('  ' + label + ' cell[' + ri + '][' + ci + '] ES-in-EN: "' + cur + '" -> "' + f + '"'); c.value = f; applied++; cells++; }
      });
    });
  }
}

A.forEach(function (g, gi) {
  var slug = norm(g.slug || g.id || '');
  if (slug !== 'portable-interfaces' && slug !== 'premium-interfaces') return;
  L.push('');
  L.push('### ' + slug + ' idx=' + gi + ' title=' + JSON.stringify(g.title));
  if (slug === 'premium-interfaces') scan(g, slug);
  if (slug === 'portable-interfaces') {
    ['productTable', 'comparison', 'comparisonTable', 'productTable_es', 'comparisonTable_es'].forEach(function (k) { fixCells(g[k], k); });
  }
});

fs.writeFileSync(P, JSON.stringify(A, null, 2), 'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/fix_final_report.txt', L.join('\n') + '\n\nimgHits=' + hits + ' imgApplied=' + applied + ' cellsFixed=' + cells, 'utf8');
console.log('done imgHits=' + hits + ' imgApplied=' + applied + ' cellsFixed=' + cells);
