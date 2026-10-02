const G = require('../data/guides.json');
const P = require('../data/products.json');
['best-bass-home-office', 'best-guitar-home-office'].forEach(id => {
  const g = G.find(x => x.id === id);
  console.log('=== ' + id + ' ===');
  console.log('title EN(' + g.title.length + '): ' + g.title);
  console.log('titleTag EN(' + g.titleTag.length + '): ' + g.titleTag);
  console.log('desc EN(' + g.description.length + '): ' + g.description);
  console.log('titleTag ES(' + g.titleTag_es.length + '): ' + g.titleTag_es);
  console.log('desc ES(' + g.description_es.length + '): ' + g.description_es);
  console.log('image: ' + g.image);
  console.log('badge: ' + g.badge + ' | date: ' + g.datePublished + ' | cat: ' + g.category);
  console.log('sections: ' + g.sections.length + ' | faq: ' + (g.faq || []).length + ' | related: ' + (g.relatedGuides || []).length);
  const sn = g.featuredSnippet || {};
  console.log('snippet keys: ' + Object.keys(sn).length + ' | rating1: ' + sn.rating1 + ' | rating2: ' + sn.rating2 + ' | price1: [' + sn.price1 + '] price2: [' + sn.price2 + ']');
  const missingRatings = g.featuredProducts.map(pid => { const p = P.find(x => x.id === pid); return pid + ':' + (p ? (p.rating || 'SIN-R') : '?'); });
  console.log('featured ratings: ' + missingRatings.join(' '));
});
