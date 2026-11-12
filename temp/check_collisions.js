// Contexto de los "mezcladores Digitales" restantes + conteo de otros nombres de nota capitalizados
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

console.log('== contexto "mezcladores Digitales" ==');
let idx = -1;
while ((idx = raw.indexOf('mezcladores Digitales', idx + 1)) >= 0) {
  console.log('---');
  console.log(raw.slice(Math.max(0, idx - 130), idx + 90).replace(/\n/g, '\\n'));
}

console.log('\n== otros nombres de nota capitalizados ==');
const notes = ['Re grave', 'Mi grave', 'Fa grave', 'Sol grave', 'Do grave', 'La grave',
  'Do sostenido', 'Re sostenido', 'Mi sostenido', 'Fa sostenido', 'Sol sostenido', 'La sostenido',
  'Do bemol', 'Re bemol', 'Mi bemol', 'Fa bemol', 'Sol bemol', 'La bemol',
  'Si agudo', 'Re agudo', 'Mi agudo', 'Sol agudo', 'La agudo'];
notes.forEach(n => { const c = raw.split(n).length - 1; if (c) console.log(n + ': ' + c); });
console.log('(fin)');
