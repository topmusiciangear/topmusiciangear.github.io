var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var raw = fs.readFileSync(p, 'utf8');
var data = JSON.parse(raw);
var out = [];
out.push('TOP-LEVEL TYPE: ' + (Array.isArray(data) ? 'ARRAY len=' + data.length : typeof data));
out.push('TOP KEYS: ' + Object.keys(data).join(', '));

function flattenGuides(o) {
  var arr = [];
  if (Array.isArray(o)) { arr = o; }
  else {
    var v = o.guides || o.guide || o.items || o.data || o.entries || o.records || o.pages || null;
    if (Array.isArray(v)) arr = v;
    else {
      Object.keys(o).forEach(function (k) { if (Array.isArray(o[k])) arr = o[k]; });
      // if still a nested object holding arrays under string keys
    }
  }
  return arr;
}
var guides = flattenGuides(data);
out.push('GUIDES FLATTENED: ' + guides.length);

function listLikeSlug(g) { return g && (g.slug || g.id || g.guide || ''); }

var relevant = guides.filter(function (g) {
  var s = listLikeSlug(g);
  return /premium|portable/.test(s);
});
out.push('RELEVANT (premium|portable in slug/id): ' + relevant.map(function (g) { return listLikeSlug(g); }).join(' | '));

function isEsish(s) { return /[áéíóúñ¿¡]|Smartgain|Voz|inst\b|Bajo|inst\.|loopback|Vintage 610|Vocal\+76|headroom|padless|scroll/i.test(String(s)); }

var relevantSlugs = {};
relevant.forEach(function (g) { relevantSlugs[listLikeSlug(g)] = 1; });

// Now scan ALL guides for comparison rows containing ES-ish English values
guides.forEach(function (g) {
  var slug = listLikeSlug(g);
  var comp = g.comparison || g.compareTable || g.compTable || (g.comparisonTable) || null;
  if (!comp) return;
  var rows = (comp.rows) || [];
  if (!rows.length) return;
  var hits = [];
  rows.forEach(function (r, ri) {
    (r.cells || []).forEach(function (c, ci) {
      var v = c.value !== undefined ? String(c.value) : '';
      var ve = c.value_es !== undefined ? String(c.value_es) : '';
      if (isEsish(v)) {
        hits.push('  row[' + ri + '] label=' + (r.label || '') + ' cell[' + ci + '] value(EN)=' + JSON.stringify(v) + (ve ? ' || value_es=' + JSON.stringify(ve) : ''));
      }
    });
  });
  if (hits.length) {
    out.push('\n===== ' + slug + ' : (' + hits.length + ') ES-ish in EN value =====');
    out = out.concat(hits);
  }
});

// Verdict count (the "solo hay un producto Verdict" issue)
relevant.forEach(function (g) {
  var slug = listLikeSlug(g);
  var vKey = null;
  ['verdictProsCons', 'verdicts', 'verdict', 'verdictGrid', 'productVerdicts'].forEach(function (k) { if (g[k]) vKey = k; });
  var v = vKey ? g[vKey] : null;
  var n = 0;
  if (Array.isArray(v)) n = v.length;
  else if (v) n = Object.keys(v).length;
  out.push('VERDICT[' + slug + '] key=' + vKey + ' count=' + n);
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/ssot_prem_desc.txt', out.join('\n'), 'utf8');
console.log('OK wrote ' + out.length + ' lines');
