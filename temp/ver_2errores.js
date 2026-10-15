const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

const bm = g.find(x => x.id === 'best-microphone');
const v = bm.verdictProsCons.find(x => x.name === 'Aston Microphones Origin');
console.log('=== best-microphone · veredicto Aston Origin ===');
console.log('pros: ' + JSON.stringify(v.pros, null, 1));
console.log('pros_es: ' + JSON.stringify(v.pros_es, null, 1));

const pi = g.find(x => x.id === 'premium-interfaces');
console.log('\n=== premium-interfaces · seccion [0] ===');
console.log(JSON.stringify(pi.sections[0], null, 1).slice(0, 900));
