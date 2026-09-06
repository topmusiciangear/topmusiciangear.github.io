const fs = require('fs');
const files = ['data/guides.json', 'data/products.json'];
const pats = [
  /(?:^|\.\s*|;\s*)A cuesta(?:n)?\s+(?:el|la|los|las|casi|menos|más|aproximadamente)\b/gi,
  /\bFantom\s+power/gi,
  /\.?\s*A\s+con funciones/gi,
  /\bpor\s+dólar\b/gi,
];
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  function walk(o, pfx) {
    if (o == null) return;
    if (typeof o === 'string') {
      for (const re of pats) {
        const m = o.match(re);
        if (m) {
          console.log('### ' + f + ' :: ' + pfx + ' [' + re.source + ']');
          console.log('   ', JSON.stringify(o.slice(Math.max(0, m.index - 80), m.index + 90)));
        }
      }
      return;
    }
    if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']'));
    else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k));
  }
  walk(data, '');
}