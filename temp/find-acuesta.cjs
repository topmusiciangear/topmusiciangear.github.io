const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
function walk(o, pfx) {
  if (o == null) return;
  if (typeof o === 'string') {
    if (/A cuesta/i.test(o)) {
      const i = o.search(/A cuesta/i);
      console.log(pfx, '=>', JSON.stringify(o.slice(Math.max(0, i - 120), i + 120)));
    }
    return;
  }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']'));
  else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k));
}
walk(g, '');