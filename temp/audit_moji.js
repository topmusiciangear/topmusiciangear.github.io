// Audit 3: mojibake / strange chars across guides + products (EN+ES text fields).
const G = require('../data/guides.json');
const P = require('../data/products.json');
const bad = [];
const MOJI = /Ã.|Â[°ªº]|â€|ðŸ|Ã±|Ã©|Ã­|Ã³|Ãº|â€œ|â€\x9d|â€™|â€“|â€”|Ã¨|Ã /;
const STRANGE = /[⌘ÃÂðãõñøæœß¤¦¨©®°±µ¶¼½¾¿×÷]/;
function check(scope, obj, fields) {
  fields.forEach(f => {
    const v = obj[f];
    if (typeof v !== 'string') return;
    if (MOJI.test(v)) bad.push(scope + '.' + f + ': MOJIBAKE');
    const m = v.match(STRANGE);
    if (m) bad.push(scope + '.' + f + ': STRANGE-CHAR ' + JSON.stringify(m[0]));
  });
}
G.forEach(g => {
  check(g.id, g, ['title', 'title_es', 'titleTag', 'titleTag_es', 'intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es']);
  (g.sections || []).forEach((s, i) => check(g.id + '.sec' + i, s, ['heading', 'heading_es', 'content', 'content_es']));
  (g.verdictProsCons || []).forEach((v, i) => {
    ['name', 'name_es'].forEach(f => check(g.id + '.v' + i, v, [f]));
    ['pros', 'cons', 'pros_es', 'cons_es'].forEach(f => (v[f] || []).forEach((t, j) => { if (MOJI.test(t)) bad.push(g.id + '.v' + i + '.' + f + '[' + j + ']: MOJIBAKE'); }));
  });
});
P.forEach(p => check('prod' + p.id, p, ['title', 'title_es', 'desc', 'desc_es']));
console.log('mojibake/strange total:', bad.length);
console.log(bad.slice(0, 40).join('\n'));