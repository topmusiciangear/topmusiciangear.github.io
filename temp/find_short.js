const G = require('../data/guides.json');
const s = JSON.stringify(G.find(x => x.id === 'best-bass-home-office'));
const re = /hortest[^"']*/g;
const out = new Set();
let m;
while ((m = re.exec(s))) { out.add(m[0].slice(0, 90)); }
console.log([...out].join('\n'));
console.log('---eight---');
const re2 = /eight[^"']{0,60}/g;
const out2 = new Set();
while ((m = re2.exec(s))) { out2.add(m[0].slice(0, 90)); }
console.log([...out2].join('\n'));
