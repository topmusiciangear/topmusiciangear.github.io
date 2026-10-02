const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
// 1. Fix source glitch + copy
['best-ribbon-mics', 'best-microphone'].forEach(id => {
  const v = G.find(x => x.id === id).verdictProsCons.find(x => x.name === 'Royer R-121');
  if (v) v.pros_es[0] = 'El ribbon que más se usa para amplificadores y metales';
});
// 2. Find thin generated sections (no specs part)
const thin = [];
G.forEach(g => {
  (g.sections || []).forEach(s => {
    if (/A Closer Look/.test(s.heading || '') && !/Standout specs/.test(s.content || '')) thin.push(g.id + ' :: ' + s.heading);
  });
});
console.log('thin generated sections: ' + thin.length);
thin.forEach(t => console.log('  ' + t));
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
