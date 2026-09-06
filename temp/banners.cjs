const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const pats = [
  [/\bes\s+la\s+elecci[oó]n\b/gi, 'es la elección'],
  [/\bson\s+la\s+elecci[oó]n\b/gi, 'son la elección'],
  [/\bhace\s+sentido\b/gi, 'hace sentido'],
  [/\ben\s+base\s+a\b/gi, 'en base a'],
  [/\beventualmente\b/gi, 'eventualmente'],
  [/\btremend[oa]s?\b/gi, 'tremendo'],
  [/\bpaso\s+adelante\b/gi, 'paso adelante'],
];
function walk(o, pfx, acc) {
  if (o == null) return;
  if (typeof o === 'string') {
    for (const [re, name] of pats) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(o)) !== null) {
        acc.push({ pfx, name, ctx: o.slice(Math.max(0, m.index - 50), m.index + 70) });
      }
    }
    return;
  }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']', acc));
  else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k, acc));
}
const acc = [];
walk(g, 'guides', acc);
walk(p, 'products', acc);
let out = acc.map(a => a.pfx + ' [' + a.name + '] :: ' + JSON.stringify(a.ctx)).join('\n');
console.log('hits:', acc.length);
require('fs').writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/banners-check.txt', out, 'utf8');