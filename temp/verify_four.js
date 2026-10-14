const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
let bad = 0, cjk = 0;
['fender-guide', 'monitor-setup', 'stage-wireless', 'best-headphones-for-mixing'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const solo = g.sections.filter(s => (s.products || []).length === 1);
  console.log('\n### ' + id + ' | reviews ' + solo.length + ' | featured ' + g.featuredProducts.length + ' | verdicts ' + g.verdictProsCons.length);
  solo.forEach(s => {
    const en = s.content || '', es = s.content_es || '';
    const p = [];
    if (!es) p.push('sin ES');
    const a = (en.match(/<p>/g) || []).length, b = (es.match(/<p>/g) || []).length;
    if (a !== b) p.push('parrafos ' + a + '/' + b);
    if (p.length) { bad++; console.log('  X ' + s.heading.slice(0, 45) + ' :: ' + p.join(', ')); }
  });
  const hs = g.sections.map(s => s.heading);
  console.log('  duplicados: ' + (hs.length - new Set(hs).size) + ' | destacados sin review: ' + g.featuredProducts.filter(i => !solo.some(s => s.products[0] === i)).length);
  console.log('  veredictos 4+4: ' + g.verdictProsCons.every(v => v.pros.length >= 4 && v.cons.length >= 4 && v.pros_es.length === v.pros.length && v.cons_es.length === v.cons.length));
});
guides.forEach(g => {
  const w = (v) => {
    if (typeof v === 'string') { if (/[\u4e00-\u9fff]/.test(v)) { cjk++; console.log('CJK en ' + g.id); } }
    else if (Array.isArray(v)) v.forEach(w);
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k]));
  };
  w(g);
});
console.log('\nCJK global: ' + cjk + ' | reviews con problemas: ' + bad);