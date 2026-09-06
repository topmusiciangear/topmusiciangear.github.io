const fs = require('fs');
const files = ['data/guides.json', 'data/products.json'];
const pats = [
  /\bpor\s+dólar\b/gi,
  /(?:^|\.\s*|;\s*)A cuesta(?:n)?\s+(?:el|la|los|las|casi|menos|más|aproximadamente)\b/gi,
  /\bFantom\s+power/gi,
  /\.?\s*A\s+con funciones/gi,
];
let out = '';
for (const f of files) {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  function walk(o, pfx) {
    if (o == null) return;
    if (typeof o === 'string') {
      for (const re of pats) {
        const m = o.match(re);
        if (m) {
          const lo = Math.max(0, m.index - 100);
          out += '### ' + f + ' :: ' + pfx + ' [' + re.source + ']\n';
          out += JSON.stringify(o.slice(lo, m.index + 110)) + '\n\n';
        }
      }
      return;
    }
    if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']'));
    else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k));
  }
  walk(data, '');
}
fs.writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/es-residual.txt', out, 'utf8');
console.log('written, chars:', out.length);