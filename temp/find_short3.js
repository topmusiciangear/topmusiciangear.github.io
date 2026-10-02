const G = require('../data/guides.json');
const s = JSON.stringify(G.find(x => x.id === 'best-bass-home-office'));
const re = /[^"']{70}Shortest[^"']{40}/g;
let m;
while ((m = re.exec(s))) { console.log(m[0].replace(/\s+/g, ' ')); console.log('---'); }
