const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const re = /es\s+la\s+elecci[oó]n\s+(para|profesional|principal|correcta|m[ií]nima|inteligente|cl[aá]sica|definitiva|m[aá]s\s+\w+|segura|econ[oó]mica|pro\b|ideal|del\b|de\s+\w+|si\s+\w+|cuando\s+\w+|que\s+\w+|para\s+)/gi;
let found = 0;
function walk(o, pfx) {
  if (o == null) return;
  if (typeof o === 'string') {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(o)) !== null) {
      console.log('###', pfx, '::', JSON.stringify(o.slice(Math.max(0, m.index - 60), m.index + 90)));
      found++;
    }
    return;
  }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, pfx + '[' + i + ']'));
  else Object.keys(o).forEach(k => walk(o[k], pfx + '.' + k));
}
walk(g, '');
console.log('total:', found);