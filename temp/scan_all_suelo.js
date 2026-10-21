const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const ES_KEYS = /(^|\.)(title_es|intro_es|conclusion_es|verdict_es|description_es|heading_es|content_es|pros_es|cons_es|name_es|value_es|text_es|best_es|key_es|type_es|q_es|a_es)$|\.faq_[qa]\d+_es$/;

const hits = [];
function walk(obj, path, gid) {
  if (typeof obj === 'string') {
    if (!ES_KEYS.test(path)) return;
    const re = /\b(en|al|del|sobre el) suelo\b/gi;
    let m;
    while ((m = re.exec(obj))) {
      hits.push({ gid, path, ctx: obj.slice(Math.max(0, m.index - 100), m.index + 130).replace(/\s+/g, ' ') });
    }
    return;
  }
  if (Array.isArray(obj)) { obj.forEach((v, i) => walk(v, path + '[' + i + ']', gid)); return; }
  if (obj && typeof obj === 'object') for (const k of Object.keys(obj)) walk(obj[k], path + '.' + k, gid);
}
for (const g of guides) walk({ title_es: g.title_es, intro_es: g.intro_es, conclusion_es: g.conclusion_es, verdict_es: g.verdict_es, description_es: g.description_es, sections: g.sections, faq: g.faq, featuredSnippet: g.featuredSnippet, verdictProsCons: g.verdictProsCons, productTable: g.productTable }, '', g.id);

console.log('total:', hits.length);
for (const h of hits) {
  console.log('\n[' + h.gid + '] ' + h.path);
  console.log('  ' + h.ctx);
}
