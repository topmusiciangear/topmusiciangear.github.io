const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'budget-interfaces');
const sec6 = s.sections[6].content_es;
const i = sec6.indexOf('EVO 4');
console.log(sec6.slice(i, i + 120));
console.log('\nusa/uses:');
console.log(sec6.includes('usa nivelación') ? 'OK: usa nivelación' : 'FALLA: no encontrado');
console.log(sec6.includes('uses') ? 'AÚN TIENE uses' : 'LIMPIO');
