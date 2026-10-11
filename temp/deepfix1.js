var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var fixes = 0, warns = [];
function G(id) { var g = guides.find(function (x) { return x.id === id; }); if (!g) warns.push('NO GUIDE ' + id); return g; }
function setCell(gid, product, rowLabel, en, es) {
  var g = G(gid); if (!g || !g.productTable) { warns.push('NO TABLE ' + gid); return; }
  var cols = g.productTable.columns;
  var ci = cols.findIndex(function (c) { return c.title === product || c.title_es === product; });
  if (ci < 0) { warns.push(gid + ' NO COL ' + product); return; }
  var row = (g.productTable.rows || []).find(function (r) { return r.label === rowLabel || r.label_es === rowLabel; });
  if (!row) { warns.push(gid + ' NO ROW ' + rowLabel); return; }
  row.values[ci] = { value: en, value_es: (es === undefined ? en : es) };
  fixes++;
}
function repText(gid, olds, news) {
  var g = G(gid); if (!g) return;
  var fields = ['conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es', 'intro', 'intro_es'];
  fields.forEach(function (f) { if (typeof g[f] === 'string' && g[f].indexOf(olds) >= 0) { g[f] = g[f].split(olds).join(news); fixes++; } });
  ['faq_q1', 'faq_a1', 'faq_q2', 'faq_a2', 'faq_q3', 'faq_a3', 'faq_q4', 'faq_a4', 'faq_q5', 'faq_a5'].forEach(function (f) {
    [''].concat(['_es']).forEach(function (s) { var k = f + s; if (typeof g[k] === 'string' && g[k].indexOf(olds) >= 0) { g[k] = g[k].split(olds).join(news); fixes++; } });
  });
  (g.sections || []).forEach(function (s) {
    ['heading', 'heading_es', 'content', 'content_es'].forEach(function (f) { if (typeof s[f] === 'string' && s[f].indexOf(olds) >= 0) { s[f] = s[f].split(olds).join(news); fixes++; } });
  });
  (g.verdictProsCons || []).forEach(function (v) {
    ['name', 'name_es'].forEach(function (f) { if (typeof v[f] === 'string' && v[f].indexOf(olds) >= 0) { v[f] = v[f].split(olds).join(news); fixes++; } });
    (v.pros || []).forEach(function (p, i) { if (typeof p === 'string' && p.indexOf(olds) >= 0) { v.pros[i] = p.split(olds).join(news); fixes++; } });
    (v.cons || []).forEach(function (p, i) { if (typeof p === 'string' && p.indexOf(olds) >= 0) { v.cons[i] = p.split(olds).join(news); fixes++; } });
    (v.pros_es || []).forEach(function (p, i) { if (typeof p === 'string' && p.indexOf(olds) >= 0) { v.pros_es[i] = p.split(olds).join(news); fixes++; } });
    (v.cons_es || []).forEach(function (p, i) { if (typeof p === 'string' && p.indexOf(olds) >= 0) { v.cons_es[i] = p.split(olds).join(news); fixes++; } });
  });
}

// ---- best-monitors: KH80 ----
setCell('best-monitors', 'Neumann KH 80 DSP', 'Woofer', '4" (100 mm)', '4" (100 mm)');
setCell('best-monitors', 'Neumann KH 80 DSP', 'Max SPL', '108.8 dB', '108.8 dB');
setCell('best-monitors', 'Neumann KH 80 DSP', 'Frequency Response', '57 Hz – 21 kHz (±3 dB)', '57 Hz – 21 kHz (±3 dB)');
setCell('best-monitors', 'Neumann KH 80 DSP', 'Dimensions', '9.2 x 6.1 x 7.6 in / 233 x 154 x 194 mm', '9.2 x 6.1 x 7.6 in / 233 x 154 x 194 mm');
setCell('best-monitors', 'Genelec 8010A', 'Max SPL', '96 dB', '96 dB');
repText('best-monitors', 'a 4.7-inch nearfield', 'a 4-inch nearfield');
repText('best-monitors', 'de 4.7 pulgadas', 'de 4 pulgadas');

// ---- small-rooms: iLoud Micro Monitor Pro (find exact product title first) ----
(function () {
  var g = G('best-monitors-for-small-rooms'); if (!g || !g.productTable) return;
  console.log('SMALL-ROOMS cols: ' + g.productTable.columns.map(function (c) { return c.title; }).join(' | '));
  console.log('SMALL-ROOMS rows: ' + g.productTable.rows.map(function (r) { return r.label; }).join(' | '));
})();
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('part1 fixes=' + fixes);
warns.forEach(function (w) { console.log('WARN: ' + w); });
