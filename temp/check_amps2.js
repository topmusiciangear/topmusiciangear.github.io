const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
[555, 75, 483, 76, 556].forEach(id => {
  const inGuides = g.filter(gd => {
    if ((gd.featuredProducts || []).includes(id)) return true;
    if ((gd.sections || []).some(s => (s.products || []).includes(id))) return true;
    if ((gd.productTable && gd.productTable.columns || []).some(c => c.title && gd.verdictProsCons.some(v => v.name))) return true;
    return false;
  }).map(gd => gd.id);
  console.log(id, '->', JSON.stringify(inGuides));
});
const d = g.find(x => x.id === 'guitar-bass-amps');
console.log('TABLE title:', d.productTable.title);
console.log('TABLE rows:', d.productTable.rows.map(r => r.label));
console.log('VERDICT:', (d.verdict || '').slice(0, 300));
console.log('DESC:', d.description);
console.log('SNIPPET keys:', Object.keys(d.featuredSnippet || {}).filter(k => /^faq/.test(k)));
