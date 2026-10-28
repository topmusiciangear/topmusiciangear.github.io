const fs = require('fs');
const a = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(a) ? a : a.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
const out = [];
out.push('TITLE: ' + g.title);
out.push('TITLE_ES: ' + g.title_es);
out.push('META: ' + g.metaDesc);
out.push('META_ES: ' + g.metaDesc_es);
out.push('\n--- TABLE ---');
(g.productTable ? (g.productTable.columns || []).map(c => c.label || c).join(' | ') : 'no table');
if (g.productTable) {
  (g.productTable.rows || []).forEach(r => {
    out.push((r.name || '?') + ' => ' + (r.values || []).map(v => (v && v.value) || '').join(' | '));
  });
}
out.push('\n--- SECTIONS ---');
g.sections.forEach((s, i) => {
  out.push('\n### ' + i + ' ' + s.heading);
  out.push('[ES] ' + s.heading_es);
  out.push('CONTENT: ' + (s.content || '').replace(/<[^>]+>/g, ''));
  out.push('CONTENT_ES: ' + (s.content_es || '').replace(/<[^>]+>/g, ''));
  out.push('PROS: ' + JSON.stringify(s.pros));
  out.push('CONS: ' + JSON.stringify(s.cons));
  out.push('PROS_ES: ' + JSON.stringify(s.pros_es));
  out.push('CONS_ES: ' + JSON.stringify(s.cons_es));
});
fs.writeFileSync('temp/nylon_guide_dump.txt', out.join('\n'), 'utf8');
console.log('bytes', out.join('\n').length);
