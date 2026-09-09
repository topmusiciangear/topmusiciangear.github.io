const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const ids = ['ableton-vs-logic','atc-vs-genelec','best-32-channel-digital-mixers','best-beginner-electric-guitar','best-drum-machine','best-headphones-for-mixing','best-live-subwoofers','best-multi-effects-pedals','best-reverb-delay','budget-bass-like-expensive','c414-vs-u87','dxr-vs-prx','fx-plugins','k371-vs-mdr7506','mics-for-creators','portable-interfaces','pro-headphones','pro-plugins','scarlett-vs-ssl','stage-wedges','studio-subwoofers','yamaha-mg-vs-behringer-xenyx'];
const my = g.filter(x => ids.includes(x.id));
// Preserve original order from guides.json
const ordered = ids.map(id => my.find(x => x.id === id)).filter(Boolean);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/chunk2_work.json', JSON.stringify(ordered, null, 2), 'utf8');
console.log('Wrote ' + ordered.length + ' guides');
