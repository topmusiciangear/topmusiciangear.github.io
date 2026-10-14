const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

const remaining = [];
guides.forEach(g => {
  const check = (text, campo) => {
    if (text && text.includes('previolificador')) {
      remaining.push({ guia: g.id, campo, texto: text.slice(text.indexOf('previolificador') - 40, text.indexOf('previolificador') + 50) });
    }
  };
  (g.sections || []).forEach((s, i) => {
    check(s.content_es, 'sections[' + i + '].content_es');
    if (s.heading_es && s.heading_es.includes('previolificador')) check(s.heading_es, 'heading_es');
  });
  check(g.intro_es, 'intro_es');
  check(g.verdict_es, 'verdict_es');
  check(g.conclusion_es, 'conclusion_es');
  (g.verdictProsCons || []).forEach((v, vi) => {
    (v.pros_es || []).forEach((p, pi) => check(p, 'vpc[' + vi + '].pros_es[' + pi + ']'));
    (v.cons_es || []).forEach((c, ci) => check(c, 'vpc[' + vi + '].cons_es[' + ci + ']'));
  });
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach((r, ri) => {
      if (r.values) r.values.forEach((v, vi) => check(v.value_es, 'productTable.row[' + ri + '].val[' + vi + ']'));
    });
  }
});

console.log('Restantes:', remaining.length);
remaining.forEach(r => console.log('  ' + r.guia + ' [' + r.campo + ']  ...' + r.texto.replace(/\n/g, ' ').slice(0, 120) + '...'));