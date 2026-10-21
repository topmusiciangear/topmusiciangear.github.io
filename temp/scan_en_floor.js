const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const EN_KEYS = /(^|\.)(title|intro|conclusion|verdict|description|heading|content|pros|cons|name|value|text|best|key|type|q|a)$|\.faq_[qa]\d+_en$/;

const hits = [];
function walk(obj, path, gid) {
  if (typeof obj === 'string') {
    if (!EN_KEYS.test(path)) return;
    const re = /\b(on|to|from|the) floor\b/gi;
    let m;
    while ((m = re.exec(obj))) {
      const ctx = obj.slice(Math.max(0, m.index - 90), m.index + 120).replace(/\s+/g, ' ');
      if (/monitor|speaker|stand|nearfield/i.test(ctx)) hits.push({ gid, path, ctx });
    }
    return;
  }
  if (Array.isArray(obj)) { obj.forEach((v, i) => walk(v, path + '[' + i + ']', gid)); return; }
  if (obj && typeof obj === 'object') for (const k of Object.keys(obj)) walk(obj[k], path + '.' + k, gid);
}
for (const g of guides) walk({ intro: g.intro, conclusion: g.conclusion, verdict: g.verdict, description: g.description, sections: g.sections, faq: g.faq, featuredSnippet: g.featuredSnippet, verdictProsCons: g.verdictProsCons, productTable: g.productTable }, '', g.id);

console.log('total:', hits.length);
for (const h of hits) { console.log('\n[' + h.gid + '] ' + h.path); console.log('  ' + h.ctx); }
