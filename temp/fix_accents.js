const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/bbl_step1.js';
let s = fs.readFileSync(f, 'utf8');
const pairs = [
  ['circuiteria pragmatica', 'circuitería pragmática'],
  ['por lo demas es puro trabajo', 'por lo demás es puro trabajo'],
  ['un rapido mastil fino en U', 'un rápido mástil fino en U'],
  ['la electronica conmutable significa un ajuste mas', 'la electrónica conmutable significa un ajuste más'],
  ['el tono aqui es claro', 'el tono aquí es claro'],
  ['escenario que fotografa tan bien', 'escenario que fotografía tan bien'],
  ['construccion que parece', 'construcción que parece'],
  ['mucho mas caro', 'mucho más caro'],
  ['Es pasivo de principio a fin, asi que', 'Es pasivo de principio a fin, así que'],
  ['hardware generico se acaba', 'hardware genérico se acaba'],
  ['estabilidad de afinacion y calidez vintage sin bateria', 'estabilidad de afinación y calidez vintage sin batería'],
  ['separacion de los 70', 'separación de los 70'],
  ['Economicos toman prestada', 'Económicos toman prestada']
];
let n = 0;
pairs.forEach(([a, b]) => { if (s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(f, s, 'utf8');
console.log('reemplazos: ' + n + '/' + pairs.length);
// Listar lo que sigue sin acento obvio
const bad = s.match(/[a-zA-ZáéíóúñÁÉÍÓÚÑ]*(?:circuiteria|demas|rapido|mastil|electronica|aqui|fotografa|construccion|mas|asi|generico|afinacion|bateria|separacion|economicos|habitat|minima|exotico|sesion|pediran|mas)[a-zA-ZáéíóúñÁÉÍÓÚÑ]*/gi);
console.log('posibles sin tilde: ' + JSON.stringify([...new Set(bad || [])].slice(0, 40)));