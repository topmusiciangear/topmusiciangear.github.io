const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'beginner-guitar');
['Frets & Fretboard', 'Pickups', 'Body Wood', 'Neck', 'Best For'].forEach(lab => {
  const r = g.productTable.rows.find(r => r.label === lab);
  console.log(lab + ':', JSON.stringify(r.values));
});
console.log('nsections:', g.sections.length, '| last:', g.sections[g.sections.length - 1].heading);
console.log('faq keys:', Object.keys(g.featuredSnippet || {}).filter(k => /^faq/.test(k)).join(','));