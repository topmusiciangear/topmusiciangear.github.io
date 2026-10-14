const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/eg_bm_reviews.js';
let s = fs.readFileSync(f, 'utf8');
const fixes = [
  ['en la mezcla un zumbido si lo buscas', 'en la mezcla un zumbido si lo buscas'],
  ['el tratamiento de la guitar', 'el tratamiento de la guitarra'],
  ['el tono de la guitarra', 'el tono de la guitarra'],
  ['El)', 'El)'],
  ['<strong>esananemen', '<strong>es'),
  ['con unAmp', 'con Amp'],
  ['el pastore de rise', 'el realce de presencia'],
  ['aun así', 'Aun así'],
  ['de la serie Player y un puente de tres sillines con que', 'de la serie Player y un puente de tres sillines de acero que'],
  ['cuto', 'corto'],
  ['TheAff', 'The Aff'],
  ['con un buen preamplificador se nota', 'con un buen preamplificador se nota'],
  ['revisión de_ACTION', 'revisión de la acción'],
  ['una flacción', 'una flaqueza'],
  ['con unam', 'con una'],
  ['a caja abierta', 'a caja abierta']
];
let n = 0;
fixes.forEach(([a, b]) => { if (a !== b && s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(f, s, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('fixes: ' + n + ' | CJK: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
// informe de tokens sospechosos
  if (s.includes(w)) console.log('!! queda "' + w + '"');
});