const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const ids = { 6: 'budget-mics', 11: 'budget-headphones', 20: 'studio-subwoofers', 57: 'player-strat-vs-pacifica', 74: 'best-grooveboxes', 75: 'best-practice-amps', 91: 'yamaha-mg-vs-behringer-xenyx', 92: 'budget-pa-systems', 94: 'fender-bass-guide', 96: 'ableton-vs-logic', 102: 'pro-microphones', 132: 'budget-usb-mics', 135: 'atc-vs-genelec', 138: 'best-shotgun-mics', 139: 'best-wireless-iems' };
const idx = g.findIndex(x => x.id === 'ableton-vs-logic');
console.log('Idx96:', idx, 'is ableton-vs-logic:', g[idx].id);
console.log('--- [96].sections[2].content_es FULL ---');
console.log(JSON.stringify(g[idx].sections[2].content_es));
console.log('--- [96].sections[0].content_es FULL ---');
console.log(JSON.stringify(g[idx].sections[0].content_es));