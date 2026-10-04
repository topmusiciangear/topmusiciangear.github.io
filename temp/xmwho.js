const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'budget-mics');
g.sections.forEach((s, i) => {
  if ((s.products || []).includes(330)) console.log('sec' + i, '[' + (s.heading || s.h) + '] prods=' + JSON.stringify(s.products) + ' skip=' + !!s.skipMedia);
});