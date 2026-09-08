const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const guides = Array.isArray(G) ? G : G.guides;
[27, 82, 98].forEach(idx => {
  const g = guides[idx];
  console.log('############ GUIDE @idx', idx, g.id, '############');
  console.log('--- featuredSnippet:', JSON.stringify(g.featuredSnippet)?.slice(0, 1000));
  console.log('--- verdict_es:', JSON.stringify(g.verdict_es)?.slice(0, 600));
  if (g.verdictProsCons) {
    const v = g.verdictProsCons;
    console.log('--- verdictProsCons:', Array.isArray(v) ? 'ARRAY' : 'OBJECT keys=' + Object.keys(v).join(','));
    if (Array.isArray(v)) v.forEach(x => console.log('  ', JSON.stringify(x).slice(0, 400)));
  }
  if (g.conclusion) console.log('--- conclusion:', JSON.stringify(g.conclusion, null, 2)?.slice(0, 1500));
  (g.sections || []).forEach((s, i) => {
    console.log(`\n----- sec${i} [${s.heading}] products=${JSON.stringify(s.products)} -----`);
    console.log('EN:', s.content);
    console.log('\nES:', s.content_es);
  });
  console.log('\n\n');
});