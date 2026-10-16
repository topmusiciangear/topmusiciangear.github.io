const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-synth-vsts.html', 'utf8');
console.log('foto: ' + (h.includes('69/690020') ? 'OK' : 'REVISAR'));
console.log('G4M link: ' + (h.includes('u-he-Diva') && h.includes('3YVM') ? 'OK' : 'REVISAR'));
console.log('G4M 125: ' + (h.includes('£125') ? 'OK' : 'REVISAR'));
console.log('Andertons 128: ' + (h.includes('£128') ? 'OK' : 'REVISAR'));
console.log('zZ 179: ' + (h.includes('$179') ? 'OK' : 'REVISAR'));
console.log('MS 159: ' + (h.includes('€159') ? 'OK' : 'REVISAR'));
console.log('zZ limpio (sin siid): ' + (!h.includes('siid') ? 'OK' : 'HAY SIID'));
