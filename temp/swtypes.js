const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'stage-wireless');
g.sections.forEach((s, i) => {
  console.log('sec' + i, JSON.stringify(s.products), (s.products || []).map(p => typeof p).join(','));
});