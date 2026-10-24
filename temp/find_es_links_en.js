// Busca enlaces _es.html dentro de campos EN de todas las guías
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const g = JSON.parse(raw);

let hits = 0;
g.forEach(gu => {
  const check = (fieldPath, val) => {
    if (typeof val === 'string' && val.includes('_es.html')) {
      const m = val.match(/href=\\"[^\\"]*_es\.html[^\\"]*\\"[^<]*</g) || val.match(/[^" ]*_es\.html/g) || [];
      console.log('GUIDE:', gu.id, '|', fieldPath, '→', m.join(' || ').slice(0, 200));
      hits++;
    }
  };
  ['title', 'intro', 'description', 'conclusion', 'verdict'].forEach(f => check(f, gu[f]));
  if (gu.featuredSnippet) Object.keys(gu.featuredSnippet).forEach(k => check('featuredSnippet.' + k, gu.featuredSnippet[k]));
  (gu.sections || []).forEach((s, si) => ['heading', 'content'].forEach(f => check('sections[' + si + '].' + f, s[f])));
  (gu.productTable && gu.productTable.rows || []).forEach((r, ri) => check('productTable.rows[' + ri + '].label', r.label));
});
console.log('total EN-field _es.html hits:', hits);
