const G = require('../data/guides.json');
const s = JSON.stringify(G.find(x => x.id === 'best-32-channel-digital-mixers'));
const re = /SQ-6(?!\+)/g;
let m;
while ((m = re.exec(s)) !== null) console.log('...' + s.slice(Math.max(0, m.index - 80), m.index + 60).replace(/\s+/g, ' '));