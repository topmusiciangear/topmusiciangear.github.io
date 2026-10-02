const G = require('../data/guides.json');
const s = JSON.stringify(G.find(x => x.id === 'best-5-string-basses'));
const show = (t) => {
  let i = -1;
  while ((i = s.indexOf(t, i + 1)) > -1) console.log('[' + t + '] ' + s.slice(Math.max(0, i - 80), i + 80).replace(/\s+/g, ' '));
};
show('StingRay');
show('neodymium');
