const fs = require('fs');

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const prods = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

function walk(obj, path, out, re) {
  if (Array.isArray(obj)) return obj.forEach((v, i) => walk(v, path + '[' + i + ']', out, re));
  if (obj && typeof obj === 'object') return Object.keys(obj).forEach(k => walk(obj[k], path + '.' + k, out, re));
  if (typeof obj === 'string') {
    let m;
    while ((m = re.exec(obj)) !== null) {
      const idx = m.index;
      out.push({ field: path, match: m[0], ctx: strip(obj.slice(Math.max(0, idx - 80), idx + 110)) });
    }
  }
}
function strip(s) { return s.replace(/<\/?[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

const guideIds = ['wireless-intercom-systems', 'wireless-lapel-mics', 'best-mic-for-podcasting'];
const prodIds = [504, 505, 506, 507, 508, 509, 510, 511];

const re = /\bI (?:tested|compared|tried|used|reviewed|owned|use|found|'ve used|'ve tested|'ve tried)\b|\bwe (?:tested|compared|tried|used|found)\b|\b(?:hands-on|hands on|in person|first-hand)\b|\bI've\b|\b(he probado|prob[eé]|hemos probado|probamos|he comparado|hemos comparado|compar[eé]|he usado|us[eé]|he estado probando|he estado usando|lo prob[eé]|los prob[eé]|la prob[eé]|en mis pruebas|en nuestras pruebas|lo puse a prueba|la puse a prueba|los puse a prueba|de primera mano|en persona|lo tengo|yo tengo|he descubierto|descubr[ií]|yo uso|uso el|uso la)\b/gi;

let out = [];
for (const g of guides) if (guideIds.includes(g.id)) walk(g, 'guides[' + g.id + ']', out, re);
for (const p of prods) if (prodIds.includes(p.id)) walk(p, 'products[id ' + p.id + ']', out, re);

console.log('TOTAL:', out.length);
out.forEach(o => console.log('-- ' + o.field + '  [' + o.match + ']\n   ...' + o.ctx + '...'));