const G = require('../data/guides.json');
const s = JSON.stringify(G.find(x => x.id === 'best-bass-home-office'));
const show = (t) => {
  let i = -1;
  while ((i = s.indexOf(t, i + 1)) > -1) console.log('[' + t + '] ' + s.slice(Math.max(0, i - 70), i + 70).replace(/\s+/g, ' '));
};
['Quiet', 'quiet', 'silencioso', 'silenciosa', 'silenciosos'].forEach(show);
