const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-synth-vsts.html', 'utf8');
console.log('foto: ' + (h.includes('141/1413021') ? 'OK' : 'REVISAR'));
console.log('G4M link: ' + (h.includes('Reveal-Sound-Spire/3NUS') ? 'OK' : 'REVISAR'));
console.log('G4M 67: ' + (h.includes('£67') ? 'OK' : 'REVISAR'));
console.log('Andertons 125: ' + (h.includes('£125') ? 'OK' : 'REVISAR'));
console.log('zZ 189: ' + (h.includes('$189') ? 'OK' : 'REVISAR'));
console.log('PB 115: ' + (h.includes('€115') ? 'OK' : 'REVISAR'));
console.log('zZ limpio (sin siid): ' + (!h.includes('siid') ? 'OK' : 'HAY SIID'));
