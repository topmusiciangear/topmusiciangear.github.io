const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('snippet keys:', Object.keys(g.featuredSnippet || {}).join(','));
const s = JSON.stringify(g);
let i = -1, n = 0;
while ((i = s.indexOf('M32R', i + 1)) > -1 && n < 20) {
  n++;
  console.log('#' + n + ' ...' + s.slice(Math.max(0, i - 80), i + 60).replace(/\s+/g, ' '));
}