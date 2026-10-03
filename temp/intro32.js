const G = require('../data/guides.json');
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
console.log('INTRO: ' + JSON.stringify(g.intro));
console.log('INTRO_ES: ' + JSON.stringify(g.intro_es));