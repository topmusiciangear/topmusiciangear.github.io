const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const ES_KEYS = /(^|\.)(title_es|intro_es|conclusion_es|verdict_es|description_es|heading_es|content_es|pros_es|cons_es|name_es|value_es|text_es|best_es|key_es|type_es|q_es|a_es)$|\.faq_[qa]\d+_es$/;

const patterns = [
  ['hace sentido', /\bhace(n)? sentido\b/gi],
  ['en adición', /\ben adici[oó]n\b/gi],
  ['eventualmente', /\beventualmente\b/gi],
  ['actualmente', /\bactualmente\b/gi],
  ['asumiendo', /\basumiendo\b/gi],
  ['remover', /\bremover\b/gi],
  ['librería', /\blibrer[ií]a(s)?\b/gi],
  ['correr (run)', /\bcorrer\b|\bcorre\b|\bcorres\b/gi],
  ['aplicar para', /\baplicar (para|a)\b/gi],
  ['setear', /\bsetear\b/gi],
  ['custom', /\bcustom\b/gi],
  ['chequear', /\bchequear\b/gi],
  ['soportar', /\bsoportar?\b/gi],
  ['performance', /\bperformance\b/gi],
  ['mayormente', /\bmayormente\b/gi],
  ['realizar', /\brealizar?\b/gi],
  ['en orden de', /\ben orden (de|a)\b/gi],
  ['basado en', /\bbasado en\b/gi],
  ['el mismo', /\bel mismo\b/gi],
  ['diferente a', /\bdiferente a\b/gi]
];

const hits = [];
function walk(obj, path, gid) {
  if (typeof obj === 'string') {
    if (!ES_KEYS.test(path)) return;
    for (const [label, re] of patterns) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(obj))) {
        hits.push({ gid, path, label, word: m[0], ctx: obj.slice(Math.max(0, m.index - 90), m.index + 130).replace(/\s+/g, ' ') });
      }
    }
    return;
  }
  if (Array.isArray(obj)) { obj.forEach((v, i) => walk(v, path + '[' + i + ']', gid)); return; }
  if (obj && typeof obj === 'object') for (const k of Object.keys(obj)) walk(obj[k], path + '.' + k, gid);
}

for (const g of guides) {
  walk({ title_es: g.title_es, intro_es: g.intro_es, conclusion_es: g.conclusion_es, verdict_es: g.verdict_es, description_es: g.description_es, sections: g.sections, faq: g.faq, featuredSnippet: g.featuredSnippet, verdictProsCons: g.verdictProsCons, productTable: g.productTable }, '', g.id);
}

const byLabel = {};
for (const h of hits) (byLabel[h.label] = byLabel[h.label] || []).push(h);

for (const label of Object.keys(byLabel)) {
  console.log('\n### ' + label + ' (' + byLabel[label].length + ')');
  for (const h of byLabel[label].slice(0, 5)) {
    console.log('  [' + h.gid + '] ' + h.path);
    console.log('    ' + h.ctx);
  }
}
