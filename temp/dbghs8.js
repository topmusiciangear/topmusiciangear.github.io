const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'hs8-vs-rokit-7');
console.log('has comparison:', !!g.comparison, '| has fsn:', !!g.featuredSnippet);
console.log('labels:', (g.comparison.rows || []).map(r => r.label).join(' | '));
console.log('fsn names:', g.featuredSnippet && g.featuredSnippet.name1_en, '/', g.featuredSnippet && g.featuredSnippet.name2_en);