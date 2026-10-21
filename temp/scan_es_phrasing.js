const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const patterns = [
  [/d[oó]nde vivan/gi, 'dónde vivan'],
  [/\bvivan\b/gi, 'vivan'],
  [/d[oó]nde vive\b/gi, 'dónde vive'],
  [/\bviven\b/gi, 'viven'],
  [/\bhace sentido\b/gi, 'hace sentido (calco)'],
  [/\beventualmente\b/gi, 'eventualmente (calco)'],
  [/\bactualmente\b/gi, 'actualmente'],
  [/\basumiendo\b/gi, 'asumiendo'],
  [/en adici[oó]n/gi, 'en adición'],
  [/\bremover\b/gi, 'remover'],
  [/\blibrer[ií]a\b/gi, 'librería (calco)'],
  [/\bsetear\b/gi, 'setear'],
  [/\bperformance\b/gi, 'performance'],
  [/\bchequear\b/gi, 'chequear'],
  [/\baplicar para\b/gi, 'aplicar para'],
  [/\bcorrer\b/gi, 'correr (run)'],
  [/\bsoporta\b/gi, 'soporta'],
  [/\bfamilias de\b/gi, 'familias de']
];

function collectStrings(obj, out, path) {
  if (typeof obj === 'string') { out.push([path, obj]); return; }
  if (Array.isArray(obj)) { obj.forEach((v, i) => collectStrings(v, out, path + '[' + i + ']')); return; }
  if (obj && typeof obj === 'object') for (const k of Object.keys(obj)) collectStrings(obj[k], out, path + '.' + k);
}

const esFields = [];
for (const g of guides) {
  const buckets = {
    title_es: g.title_es,
    intro_es: g.intro_es,
    conclusion_es: g.conclusion_es,
    verdict_es: g.verdict_es,
    description_es: g.description_es,
    sections: g.sections,
    faq: g.faq,
    featuredSnippet: g.featuredSnippet,
    verdictProsCons: g.verdictProsCons,
    productTable: g.productTable,
    steps: g.steps
  };
  const out = [];
  collectStrings(buckets, out, '');
  for (const [path, text] of out) {
    // solo campos en español
    if (!/(_es|sections|faq|featuredSnippet|verdictProsCons|productTable|steps)/.test(path)) continue;
    if (/_en\b|\.q\b|\.a\b/.test(path) && !/_es/.test(path)) continue;
    esFields.push([g.id, path, text]);
  }
}

for (const [re, label] of patterns) {
  const hits = [];
  for (const [id, path, text] of esFields) {
    const m = text.match(re);
    if (m) hits.push([id, path, m.length]);
  }
  if (hits.length) {
    console.log('\n### ' + label + ' -> ' + hits.length + ' campos');
    for (const [id, path, n] of hits.slice(0, 6)) console.log('   ' + id + ' | ' + path + ' | ' + n);
  }
}
