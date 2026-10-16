const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'usb-mics');
let S = JSON.stringify(gg);
const i = S.indexOf('budget-usb-mics_es.html');
console.log('anchor: ' + JSON.stringify(S.slice(i, i + 160)));
