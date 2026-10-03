const G = require('../data/guides.json');
const dm = G.find(x => x.id === 'best-drum-machine');
const s1 = JSON.stringify(dm);
let i = -1;
while ((i = s1.indexOf('beatmaking', i + 1)) > -1) console.log('drum: ...' + s1.slice(Math.max(0, i - 80), i + 40).replace(/\s+/g, ' '));
const w = G.find(x => x.id === 'wireless-intercom-systems');
const s2 = JSON.stringify(w);
i = -1;
while ((i = s2.indexOf('inalámbrico real', i + 1)) > -1) console.log('wire: ...' + s2.slice(Math.max(0, i - 80), i + 40).replace(/\s+/g, ' '));