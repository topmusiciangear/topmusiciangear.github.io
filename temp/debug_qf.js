const fs = require('fs');
const bg = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const s = bg.indexOf('const QF_ES_MAP');
const e = bg.indexOf('};', s);
const body = bg.slice(s, e);
console.log('map chars:', body.length);
console.log('has 2000W raw:', body.includes('2000W (peak)'));
console.log('tail:', JSON.stringify(body.slice(-200)));
const re = /['"]((?:[^'"\\]|\\.)+)['"]\s*:/g;
const set = new Set();
let m;
while ((m = re.exec(body)) !== null) set.add(m[1]);
console.log('keys parsed:', set.size);
console.log('2000W in set:', set.has('2000W (peak)'));
console.log('Cardioid in set:', set.has('Cardioid'));
// lista de las primeras 5 claves
console.log('muestra:', [...set].slice(0, 8));
