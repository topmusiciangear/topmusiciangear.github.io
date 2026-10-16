const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-synth-vsts.html', 'utf8');
console.log('foto: ' + (h.includes('134/1340036') ? 'OK' : 'REVISAR'));
console.log('G4M link: ' + (h.includes('Arturia-Pigments-7/7VVT') ? 'OK' : 'REVISAR'));
console.log('G4M 100: ' + (h.includes('£100') ? 'OK' : 'REVISAR'));
console.log('Andertons 163: ' + (h.includes('£163') ? 'OK' : 'REVISAR'));
console.log('zZ 199: ' + (h.includes('$199') ? 'OK' : 'REVISAR'));
console.log('MS 199: ' + (h.includes('€199') ? 'OK' : 'REVISAR'));
console.log('zZ limpio (sin siid): ' + (!h.includes('siid') ? 'OK' : 'HAY SIID'));
