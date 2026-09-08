const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const guides = Array.isArray(G) ? G : G.guides;
console.log('TOTAL GUIDES:', guides.length);
[27, 82, 98].forEach(idx => {
  const g = guides[idx];
  console.log('================ GUIDE @idx', idx, '================');
  console.log('id:', JSON.stringify(g.id), '| url:', g.url, '| title:', (g.title || '').slice(0, 90));
  console.log('featuredProducts:', JSON.stringify(g.featuredProducts));
  console.log('productTable title:', g.productTable && g.productTable.title);
  if (g.productTable) {
    console.log('columns:', JSON.stringify(g.productTable.columns));
    console.log('rows:');
    (g.productTable.rows || []).forEach(r => console.log('  ROW:', JSON.stringify(r)));
  }
  console.log('verdict:', JSON.stringify(g.verdict)?.slice(0, 700));
  console.log('sections:');
  (g.sections || []).forEach((s, i) => {
    console.log(`sec${i} heading: ${s.heading} | products: ${JSON.stringify(s.products)} | contentLen: ${(s.content||'').length}/${(s.content_es||'').length}`);
  });
  console.log('==================================================');
});