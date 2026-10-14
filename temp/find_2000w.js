const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
guides.forEach(g => {
  const all = [];
  (g.sections || []).forEach((s, i) => {
    if (!s) return;
    [['content', s.content], ['content_es', s.content_es]].forEach(([f, t]) => {
      if (t && t.includes('2000W')) all.push('sections[' + i + '].' + f);
    });
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    if (!v) return;
    ['pros', 'cons', 'pros_es', 'cons_es'].forEach(f => {
      (v[f] || []).forEach((t, j) => { if (t && t.includes('2000W')) all.push('vpc[' + i + '].' + f + '[' + j + ']'); });
    });
  });
  if (g.productTable && g.productTable.rows) g.productTable.rows.forEach((r, i) => {
    if (!r || !r.values) return;
    r.values.forEach((vv, j) => {
      if (vv && ((vv.value || '') + (vv.value_es || '')).includes('2000W')) all.push('table.row[' + i + '].val[' + j + ']');
    });
  });
  ['intro', 'intro_es', 'verdict', 'verdict_es', 'conclusion', 'conclusion_es'].forEach(f => {
    if (g[f] && g[f].includes('2000W')) all.push(f);
  });
  if (all.length) { console.log(g.id + ':'); all.forEach(a => console.log('  ' + a)); }
});