const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const g = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const names = ['Model:Cycles', 'Circuit Tracks', 'TR-8S', 'TR-6S', 'Model:Samples', 'Circuit Rhythm', 'Polyend Play', 'OP-Z', 'SEQTRAK', 'Lofi-12', 'Volca Sample', 'Tracker Mini'];
names.forEach(n => {
  const prod = p.filter(y => y.title.includes(n));
  console.log('== ' + n + ' -> ' + (prod.length ? prod.map(x => x.id + ':' + x.title).join(' | ') : 'NOT IN DB'));
  const ids = prod.map(x => x.id);
  const inGuides = g.filter(gd => {
    const feat = gd.featuredProducts || [];
    if (ids.some(id => feat.includes(id))) return true;
    const secs = gd.sections || [];
    if (secs.some(s => ids.some(id => (s.products || []).includes(id)))) return true;
    const cols = (gd.productTable && gd.productTable.columns || []).map(c => c.title);
    if (cols.some(c => c.includes(n))) return true;
    const vpc = (gd.verdictProsCons || []).map(v => v.name);
    if (vpc.some(v => v.includes(n))) return true;
    return false;
  }).map(gd => gd.title);
  console.log('   guides: ' + JSON.stringify(inGuides));
});
