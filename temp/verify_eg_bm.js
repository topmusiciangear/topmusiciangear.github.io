const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
let bad = 0;
['best-electric-guitar', 'budget-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const solo = g.sections.filter(s => (s.products || []).length === 1);
  console.log('\n### ' + id + ' | reviews: ' + solo.length + ' | featured: ' + g.featuredProducts.length);
  solo.forEach(s => {
    const en = s.content || '', es = s.content_es || '';
    const p = [];
    if (!es) p.push('sin ES');
    if (/[\u4e00-\u9fff]/.test(en + es)) p.push('CJK');
    const a = (en.match(/<p>/g) || []).length, b = (es.match(/<p>/g) || []).length;
    if (a !== b) p.push('parrafos ' + a + '/' + b);
    if (/<[A-Za-z]+>/.test(en + es)) p.push('tag suelta');
    if (p.length) { bad++; console.log('  X ' + s.heading + ' :: ' + p.join(', ')); }
  });
  const hs = g.sections.map(s => s.heading);
  console.log('  headings duplicados: ' + (hs.length - new Set(hs).size));
  const noRev = g.featuredProducts.filter(i => !solo.some(s => s.products[0] === i));
  console.log('  destacados sin review: ' + JSON.stringify(noRev));
  console.log('  paridad verdicts: ' + g.verdictProsCons.every(v => v.pros.length >= 4 && v.cons.length >= 4 && v.pros_es.length === v.pros.length && v.cons_es.length === v.cons.length));
});
console.log('\nreviews con problemas: ' + bad);