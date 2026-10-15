const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let n = 0;

function swap(de, a, et) {
  let t = JSON.stringify(s);
  if (!t.includes(de)) { console.log('  FALLA: ' + et); return; }
  const cuenta = t.split(de).length - 1;
  // reemplazo sobre el objeto real, no sobre el string
  (function rec(o) {
    if (typeof o === 'string') return REGLAS.reduce((acc, [x, y]) => acc.split(x).join(y), o);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(s);
  n += cuenta;
  console.log('  ok (' + cuenta + ') ' + et);
}
let REGLAS = [];

REGLAS = [
  ['No MIDI, so keyboard controllers need a separate DIN adapter',
   'No MIDI and no DIN socket: a five-pin keyboard controller needs a USB-to-MIDI cable to the computer, not an adaptor'],
  ['Ten centimetres deep', 'Fourteen centimetres deep']
];
swap(REGLAS[0][0], REGLAS[0][1], 'Scarlett EN cons: DIN');
swap(REGLAS[1][0], REGLAS[1][1], 'G4M EN cons: grosor');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL FINAL ABSOLUTO ===');
const malas = [['6110', 'Apollo 6110'], ['\bDoppler\b', 'EQ Doppler'], ['Ten centimetres', '10 cm EN'],
 ['Diez centímetros', '10 cm ES'], ['\bDIN adapter\b|adaptador DIN', 'adaptador DIN'], ['Las pajas', 'pajas'],
 ['escurrido', 'escurrido'], ['empastre', 'empastre'], ['explosivas', 'explosivas'], ['depurar', 'depurar'],
 ['\bDebugging\b', 'Debugging'], ['cancels its own|se cancela a sí misma', 'cable que se cancela a si mismo'],
 ['disappears first|desaparecen primero', 'el bajo desaparece primero'], ['Absórbelos', 'Absórbelos'],
 ['same 32-bit|misma salida digital de 32', '32 bits en el Signature'],
 ['Signature runs USB|Signature hace el USB', 'USB en el Signature'],
 ['thirty millimetres|treinta milímetros', '30 mm acolchado'], ['\bcircuitry\b(?![^.]{0,40}Unison)', 'circuitry suelto en ES']];
let sucios = 0;
malas.forEach(([re, et]) => {
  const c = (t.match(new RegExp(re, 'g')) || []).length;
  sucios += c;
  console.log('  ' + String(c).padStart(3) + '  ' + et);
});
console.log('\n  TOTAL RESIDUOS: ' + sucios);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('  veredictos 4+4 EN y ES: ' + s2.verdictProsCons.filter(v => v.pros.length >= 4 && v.cons.length >= 4 && v.pros_es.length >= 4 && v.cons_es.length >= 4).length + '/' + s2.verdictProsCons.length);
