// Audit 3 (fixed): true mojibake only (UTF-8 double-encoding artifacts).
const G = require('../data/guides.json');
const P = require('../data/products.json');
const bad = [];
const MOJI = /Ã.|Â[^a-zA-Z]|â€|ðŸ|â€œ|â€\x9d|â€™|â€“|â€”|ã€|â„¢|Â\xa0/;
function check(scope, obj, fields) {
  fields.forEach(f => {
    const v = obj[f];
    if (typeof v !== 'string') return;
    const m = v.match(MOJI);
    if (m) bad.push(scope + '.' + f + ': ' + JSON.stringify(m[0]) + ' <<' + v.slice(Math.max(0, v.indexOf(m[0]) - 30), v.indexOf(m[0]) + 30).replace(/\s+/g, ' '));
  });
}
G.forEach(g => {
  check(g.id, g, ['title', 'title_es', 'titleTag', 'titleTag_es', 'intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es']);
  (g.sections || []).forEach((s, i) => check(g.id + '.sec' + i, s, ['heading', 'heading_es', 'content', 'content_es']));
  (g.verdictProsCons || []).forEach((v, i) => {
    check(g.id + '.v' + i, v, ['name', 'name_es']);
    ['pros', 'cons', 'pros_es', 'cons_es'].forEach(f => (v[f] || []).forEach((t, j) => { const m = typeof t === 'string' && t.match(MOJI); if (m) bad.push(g.id + '.v' + i + '.' + f + '[' + j + ']: ' + JSON.stringify(m[0])); }));
  });
});
P.forEach(p => check('prod' + p.id, p, ['title', 'title_es', 'desc', 'desc_es']));
console.log('true mojibake total:', bad.length);
console.log(bad.slice(0, 30).join('\n'));