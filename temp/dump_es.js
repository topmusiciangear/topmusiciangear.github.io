const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'best-bass-home-office');
const out = [];
out.push('=== TITLE_ES: ' + g.title_es);
out.push('=== TITLETAG_ES: ' + g.titleTag_es);
out.push('=== DESC_ES: ' + g.description_es);
out.push('=== INTRO_ES: ' + g.intro_es);
g.sections.forEach((s, i) => {
  out.push('--- SEC' + i + ' H_ES: ' + s.heading_es);
  out.push('SEC' + i + ' C_ES: ' + s.content_es);
});
out.push('=== CONCLUSION_ES: ' + g.conclusion_es);
out.push('=== VERDICT_ES: ' + g.verdict_es);
g.productTable.columns.forEach(c => out.push('COL_ES: ' + c.title_es));
g.productTable.rows.forEach(r => {
  out.push('ROW: ' + r.label);
  r.values.forEach(v => out.push('   EN: ' + v.value + ' || ES: ' + v.value_es));
});
g.verdictProsCons.forEach(v => {
  out.push('V: ' + v.name_es + ' | pros_es: ' + v.pros_es.join(' ~ '));
  out.push('   cons_es: ' + v.cons_es.join(' ~ '));
});
g.faq.forEach((f, i) => { out.push('FAQ' + i + ' Q_ES: ' + f.q_es); out.push('FAQ' + i + ' A_ES: ' + f.a_es); });
const s = g.featuredSnippet;
out.push('SNIP text_es: ' + s.text_es);
out.push('SNIP best/key ES: ' + [s.best1_es, s.key1_es, s.best2_es, s.key2_es].join(' | '));
fs.writeFileSync('temp/es_review.txt', out.join('\n'));
console.log('written ' + out.length + ' lines');
