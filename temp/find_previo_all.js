const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

const found = new Set();
guides.forEach(g => {
  const all = [];
  (g.sections || []).forEach((s, i) => {
    all.push(['sections[' + i + '].content_es', s.content_es]);
    all.push(['sections[' + i + '].heading_es', s.heading_es]);
  });
  all.push(['intro_es', g.intro_es]);
  all.push(['verdict_es', g.verdict_es]);
  all.push(['conclusion_es', g.conclusion_es]);
  (g.verdictProsCons || []).forEach((v, i) => {
    (v.pros_es || []).forEach((p, j) => all.push(['vpc[' + i + '].pros_es[' + j + ']', p]));
    (v.cons_es || []).forEach((c, j) => all.push(['vpc[' + i + '].cons_es[' + j + ']', c]));
  });
  if (g.productTable) {
    if (g.productTable.rows) g.productTable.rows.forEach((r, i) => {
      if (r.label_es) all.push(['pt.row[' + i + '].label_es', r.label_es]);
      if (r.values) r.values.forEach((v, j) => all.push(['pt.row[' + i + '].val[' + j + ']', v.value_es]));
    });
    if (g.productTable.columns) g.productTable.columns.forEach((c, i) => all.push(['pt.col[' + i + ']', c.title_es]));
  }
  // Check ALL other string fields in the guide
  Object.keys(g).forEach(key => {
    if (['id', 'title', 'title_es', 'description', 'category', 'intro', 'intro_es', 'verdict', 'verdict_es', 'conclusion', 'conclusion_es', 'sections', 'verdictProsCons', 'productTable', 'featuredProducts', 'faqs'].includes(key)) return;
    const val = g[key];
    if (typeof val === 'string' && val.includes('previolificador')) {
      found.add(g.id + '.' + key);
    }
    if (Array.isArray(val)) {
      val.forEach((item, idx) => {
        if (typeof item === 'string' && item.includes('previolificador')) {
          found.add(g.id + '.' + key + '[' + idx + ']');
        }
        if (item && typeof item === 'object') {
          const str = JSON.stringify(item);
          if (str.includes('previolificador')) {
            found.add(g.id + '.' + key + '[' + idx + '] (nested)');
          }
        }
      });
    }
  });
  all.forEach(([campo, texto]) => {
    if (texto && texto.includes('previolificador')) {
      found.add(g.id + '.' + campo);
    }
  });
});

console.log('Campos con previolificador restante:');
Array.from(found).sort().forEach(f => console.log('  ' + f));