const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function walk(o, pfx, patterns, out) {
  if (o == null) return;
  if (typeof o === 'string') {
    for (const re of patterns) {
      const m = o.match(re);
      if (m) out.push({ pfx, v: o, re: re.source });
    }
    return;
  }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']', patterns, out));
  else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k, patterns, out));
}
const pats = [
  /(?:^|\W)A cuesta(?:n)?\s+\w+.*/gi,
  /Fantom\s+power/gi,
  /A con funciones/gi,
];
const out = [];
for (const gr of g) walk(gr, gr.id, pats, out);
for (const h of out) {
  const i = h.v.search(/A cuesta|Fantom power|A con funciones/i);
  console.log('###', h.pfx, '[' + h.re + ']');
  console.log('   ', JSON.stringify(h.v.slice(Math.max(0, i - 90), i + 90)));
}