const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const hits = [];
function chk(guide, field, en, es) {
  if (en && es && en === es) hits.push(guide + ' ' + field + ' = "' + String(en).slice(0, 60) + '"');
}
G.forEach(g => {
  ['title', 'intro', 'conclusion', 'verdict', 'description'].forEach(k => chk(g.id, k, g[k], g[k + '_es']));
  (g.sections || []).forEach((s, i) => {
    chk(g.id, 'sec' + i + '.heading', s.heading || s.h, s.heading_es || s.h_es);
    chk(g.id, 'sec' + i + '.content', s.content, s.content_es);
  });
  if (g.productTable) {
    (g.productTable.columns || []).forEach((c, i) => chk(g.id, 'col' + i, c.title, c.title_es));
    (g.productTable.rows || []).forEach((r, i) => {
      chk(g.id, 'row' + i + '.label', r.label, r.label_es);
      (r.values || []).forEach((v, j) => chk(g.id, 'row' + i + '.val' + j, v.value, v.value_es));
    });
  }
  if (g.comparison) (g.comparison.rows || []).forEach((r, i) => {
    chk(g.id, 'comp' + i + '.label', r.label, r.label_es);
    ['val1', 'val2', 'val3', 'val4', 'val5'].forEach(k => chk(g.id, 'comp' + i + '.' + k, r[k], r[k + '_es']));
  });
  (g.verdictProsCons || []).forEach(v => {
    chk(g.id, 'vpc.' + v.name + '.name', v.name, v.name_es);
    (v.pros || []).forEach((p, i) => chk(g.id, 'vpc.' + v.name + '.pro' + i, p, (v.pros_es || [])[i]));
    (v.cons || []).forEach((p, i) => chk(g.id, 'vpc.' + v.name + '.con' + i, p, (v.cons_es || [])[i]));
  });
  const fsn = g.featuredSnippet || {};
  for (let i = 1; i <= 8; i++) {
    chk(g.id, 'faq_q' + i, fsn['faq_q' + i + '_en'], fsn['faq_q' + i + '_es']);
    chk(g.id, 'faq_a' + i, fsn['faq_a' + i + '_en'], fsn['faq_a' + i + '_es']);
  }
  (g.faq || []).forEach((f, i) => { chk(g.id, 'faq' + i + '.q', f.q, f.q_es); chk(g.id, 'faq' + i + '.a', f.a, f.a_es); });
});
console.log('total idénticos EN=ES:', hits.length);
hits.slice(0, 80).forEach(h => console.log(' ' + h));