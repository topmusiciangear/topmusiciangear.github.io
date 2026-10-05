const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function sec(gid, si) { return G.find(x => x.id === gid).sections[si]; }
sec('ableton-vs-fl-studio', 1).products = [112];
console.log('OK ableton S1 products');
sec('ew-iem-g4-twin-vs-psm300', 1).products = [266];
sec('ew-iem-g4-twin-vs-psm300', 0).skipMedia = true;
console.log('OK ew-iem S1 products + S0 skip');
sec('me90-vs-mx5', 0).skipMedia = true;
console.log('OK me90 S0 skip');
sec('rodecaster-pro2-vs-dlz-creator', 0).skipMedia = true;
console.log('OK rodecaster S0 skip');
fs.writeFileSync(F, JSON.stringify(G, null, 2));