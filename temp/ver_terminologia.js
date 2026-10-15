const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const t = JSON.stringify(s);
console.log('=== "alimentados" / "powered" en starter-studio ===\n');
console.log('  ES "altavoces alimentados" : ' + (t.match(/altavoces alimentados/gi) || []).length);
console.log('  ES "monitores alimentados" : ' + (t.match(/monitores alimentados/gi) || []).length);
console.log('  ES "alimentados" (total)   : ' + (t.match(/alimentados/gi) || []).length);
console.log('  ES "altavoces activos"      : ' + (t.match(/altavoces activos/gi) || []).length);
console.log('  EN "powered speakers"       : ' + (t.match(/powered speakers/gi) || []).length);
console.log('  EN "powered monitors"       : ' + (t.match(/powered monitors/gi) || []).length);
console.log('  EN "powered" (total)        : ' + (t.match(/powered/gi) || []).length);

console.log('\n=== cada frase con "alimentados" / "powered speakers" ===');
function b(o, r) {
  if (typeof o === 'string') {
    [...o.matchAll(/.{0,90}(?:alimentados|powered (?:speakers|monitors)).{0,90}/gi)].forEach(m =>
      console.log('\n  [' + r + ']\n     ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...'));
    return;
  }
  if (Array.isArray(o)) return o.forEach((v, i) => b(v, r + '[' + i + ']'));
  if (o && typeof o === 'object') Object.keys(o).forEach(k => b(o[k], r + '.' + k));
}
b(s.sections, 'sections');
b(s.productTable, 'tabla');
['intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es'].forEach(k => { if (typeof s[k] === 'string') b(s[k], k); });
