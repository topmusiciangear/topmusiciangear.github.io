const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-synth-vsts.html', 'utf8');
console.log('foto: ' + (h.includes('119/1197659') ? 'OK' : 'REVISAR'));
console.log('G4M link: ' + (h.includes('Native-Instruments-Massive-X/72HB') ? 'OK' : 'REVISAR'));
console.log('G4M 168: ' + (h.includes('£168') ? 'OK' : 'REVISAR'));
console.log('zZ 199: ' + (h.includes('$199') ? 'OK' : 'REVISAR'));
console.log('MS 189: ' + (h.includes('€189') ? 'OK' : 'REVISAR'));
console.log('zZ limpio (sin siid): ' + (!h.includes('siid') ? 'OK' : 'HAY SIID'));
