const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'sidechain-modulation-plugins');
g.sections.forEach((s, i) => {
  ['content', 'content_es'].forEach(k => {
    const t = s[k] || '';
    const rx = /28 effect|28 efectos|28 m\u00f3dulos/;
    if (rx.test(t)) {
      const j = t.search(rx);
      console.log('sec' + i + '.' + k + ': ' + t.slice(Math.max(0, j - 60), j + 170).replace(/\s+/g, ' '));
    }
  });
});
const v = g.verdictProsCons.find(x => /Infiltrator/.test(x.name));
['pros', 'pros_es'].forEach(k => {
  (v[k] || []).forEach(t => { if (/28/.test(t)) console.log('v.' + k + ': ' + t); });
});
