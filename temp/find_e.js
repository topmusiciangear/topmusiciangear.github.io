const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const s = JSON.stringify(G.find(x => x.id === 'best-5-string-basses'));
const show = (t) => {
  let i = -1;
  while ((i = s.indexOf(t, i + 1)) > -1) console.log('[' + t + '] ' + s.slice(Math.max(0, i - 80), i + 80).replace(/\s+/g, ' '));
};
['SR505E', 'SR505N', 'Nordstrand', 'discontinu'].forEach(show);
