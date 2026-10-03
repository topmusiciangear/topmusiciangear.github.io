const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('featured:', JSON.stringify(g.featuredProducts));
g.sections.forEach((s, n) => {
  const t = (s.heading || '') + ' ' + (s.content || '');
  if (/DL32S/.test(t)) console.log('SEC' + n + ' prods=' + JSON.stringify(s.products) + ' h=' + s.heading + '\nESh=' + s.heading_es);
});
const vi = (g.verdictProsCons || []).findIndex(v => /DL32S/.test(v.name));
console.log('verdict idx:', vi, JSON.stringify(g.verdictProsCons[vi]));
const sAll = JSON.stringify(g);
['DL32S', 'DL32SE', 'Ui24R', 'Matrix', 'matrix'].forEach(k => console.log(k + ' x' + (sAll.split(k).length - 1)));
console.log('--- other guides with DL32S ---');
G.forEach(x => {
  if (x.id === 'best-32-channel-digital-mixers') return;
  if (JSON.stringify(x).indexOf('DL32S') > -1) console.log(x.id);
});