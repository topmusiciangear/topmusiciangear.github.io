const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const byId = {};
G.forEach(g => { byId[g.id] = g; });
// 1. parlour variant anchors
const p = byId['best-parlor-guitars'];
p.intro = p.intro.replace(/parlor/i, m => m + ' (parlour in UK spelling)');
p.intro_es = p.intro_es.replace(/parlor/i, m => m + ' (parlour en ortografía británica)');
// 2. reciprocal related links
const link = (a, b) => {
  const g = byId[a];
  if (!g.relatedGuides.includes(b)) { g.relatedGuides.push(b); console.log(a + ' -> ' + b); }
  else console.log(a + ' -> ' + b + ' (ya)');
};
link('best-live-sound-mixers', 'best-32-channel-digital-mixers');
link('best-live-sound-mixers', 'pro-mixers');
link('best-32-channel-digital-mixers', 'pro-mixers');
link('budget-interfaces', 'scarlett-vs-motu');
link('scarlett-vs-motu', 'budget-interfaces');
link('scarlett-vs-motu', 'portable-interfaces');
link('portable-interfaces', 'scarlett-vs-motu');
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('ok');
