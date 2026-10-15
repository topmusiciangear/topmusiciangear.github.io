const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/temp/anyadir_monitores.js';
let s = fs.readFileSync(p, 'utf8');

// localizar el fragmento corrupto entre "rodea el tweeter con una" y " fisica"
const i = s.indexOf('rodea el tweeter con una');
const j = s.indexOf(' física', i);
console.log('fragmento actual: ' + JSON.stringify(s.slice(i, j)));

const bueno = 'rodea el tweeter con una abombinatura喇叭 flared';
// usar la version correcta
const correcto = 'rodea el tweeter con un reborde físico';
s = s.slice(0, i) + correcto + s.slice(j);

fs.writeFileSync(p, s, 'utf8');
console.log('fragmento nuevo : ' + JSON.stringify(s.slice(s.indexOf('rodea el tweeter con una'), s.indexOf(' física', s.indexOf('rodea el tweeter con una')))));

// comprobar que no queden restos sospechosos en los textos largos
const raro = [...s.matchAll(/[a-zà-ú]+[A-ZÀ-Ú][a-zà-ú]+/g)].map(m => m[0])
  .filter(w => !/^(La|LCD|DSP|EQ|Class|Silk|Kevlar|Waveguide|Image|Boundary|Signal|Linkwitz|Riley|Room|Control|Stream|Slide|UNIQUE|This|The|Something)$/.test(w));
console.log('\npalabras con mayuscula interna sospechosas: ' + (raro.length ? raro.join(', ') : 'ninguna'));
