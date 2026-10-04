const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'open-headphones');
g.sections.forEach((s, i) => {
  console.log('sec' + i, 'prods=' + JSON.stringify(s.products), 'skip=' + !!s.skipMedia, 'split=' + !!s.splitProducts, '| ' + (s.heading || '').slice(0, 60));
});