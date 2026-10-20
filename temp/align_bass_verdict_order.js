const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'beginner-bass-guitars');
const order = g.verdictProsCons.map(v => v.name);

function reorder(html) {
  const parts = html.match(/<p>[\s\S]*?<\/p>/g) || [];
  const map = {};
  const extras = [];
  parts.forEach(p => {
    const m = p.match(/<span class="product-name">([^<]+)<\/span>/);
    if (m && order.includes(m[1])) map[m[1]] = p;
    else extras.push(p);
  });
  const missing = order.filter(n => !map[n]);
  if (missing.length) throw new Error('missing paragraphs: ' + missing.join(', '));
  return extras.concat(order.map(n => map[n])).join('');
}

g.verdict = reorder(g.verdict);
g.verdict_es = reorder(g.verdict_es);
fs.writeFileSync(f, JSON.stringify(gs, null, 2));

console.log('EN order:', (g.verdict.match(/product-name">([^<]+)/g) || []).map(x => x.split('>')[1]).join(' | '));
console.log('ES order:', (g.verdict_es.match(/product-name">([^<]+)/g) || []).map(x => x.split('>')[1]).join(' | '));
