const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const re = /\b(?:es|son|ser[áa]|fue|era)\s+(?:la\s+)?elecci[oó]n\b/gi;
let found = 0;
const out = [];
function walk(o, pfx, file) {
  if (o == null) return;
  if (typeof o === 'string') {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(o)) !== null) {
      out.push({ file, pfx, ctx: o.slice(Math.max(0, m.index - 70), m.index + 100) });
      found++;
    }
    return;
  }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']', file));
  else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k, file));
}
walk(g, '', 'guides.json');
walk(p, '', 'products.json');
const fsr = require('fs');
fsr.writeFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/eleccion-all.txt', out.map(x => '### ' + x.file + ' :: ' + x.pfx + '\n' + JSON.stringify(x.ctx) + '\n').join('\n'), 'utf8');
console.log('total:', found);