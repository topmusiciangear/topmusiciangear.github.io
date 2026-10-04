const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'active-vs-passive-pa');
['content', 'content_es'].forEach(k => {
  const t = g.sections[2][k];
  const m = t.match(/<table[\s\S]*?<\/table>/);
  console.log('=== ' + k + ' TABLE:');
  console.log(m[0].replace(/<[^>]*>/g, '|').replace(/\|+/g, ' | '));
});