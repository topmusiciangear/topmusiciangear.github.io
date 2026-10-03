const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
const s = JSON.stringify(g);
let i = -1, n = 0;
while ((i = s.indexOf('SQ-6', i + 1)) > -1 && n < 30) {
  n++;
  console.log('#' + n + ' ...' + s.slice(Math.max(0, i - 90), i + 90).replace(/\s+/g, ' '));
}