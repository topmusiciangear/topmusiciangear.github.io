const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-synth-vsts.html', 'utf8');
console.log('foto: ' + (h.includes('ap79glkmzpg1fsfxjzf8jl0bx2f4') ? 'OK' : 'REVISAR'));
console.log('PB 226: ' + (h.includes('€226') ? 'OK' : 'REVISAR'));
