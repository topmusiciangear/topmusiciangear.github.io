const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-synth-vsts.html', 'utf8');
console.log('foto: ' + (h.includes('83/839919') ? 'OK' : 'REVISAR'));
console.log('Andertons link: ' + (h.includes('kilohearts-phase-plant-modular-synth-esd') ? 'OK' : 'REVISAR'));
console.log('Andertons 199: ' + (h.includes('£199') ? 'OK' : 'REVISAR'));
console.log('PB 184: ' + (h.includes('€184') ? 'OK' : 'REVISAR'));
console.log('sin search_query: ' + (!h.includes('search_query') ? 'OK' : 'HAY PARAM'));
