// Reemplazo global en TODO el objeto guia (secciones, veredictos, faq...)
const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const REGLAS = [
  ['a reworked Apollo 6110 circuit', 'a reworked UA 610 valve circuit'],
  ['un rediseño del circuito Apollo 6110', 'un rediseño del circuito de válvulas UA 610'],
  ['Apollo 6110', 'UA 610'],
  ['6110', 'UA 610'],
  ['Sin MIDI, los teclados necesitan un adaptador DIN aparte',
   'Sin MIDI ni conector DIN: un teclado de 5 pines necesita un cable USB-a-MIDI hasta el ordenador'],
  ['a separate DIN adapter for keyboards', 'no DIN socket at all: a five-pin keyboard needs a USB-to-MIDI cable to the computer'],
  ['Diez centímetros de fondo', 'Catorce centímetros de fondo'],
  ['Ten centimetres thick', 'Fourteen centimetres thick'],
  ['matan las explosivas sin la sibilancia de un antiviento de espuma gruesa',
   'matan las plosivas sin la sibilancia de un filtro antiviento de espuma gruesa'],
  ['una cosa menos que depurar cuando una toma sale mal',
   'una cosa menos que diagnosticar cuando una toma sale mal'],
  ['one less thing to debug', 'one less thing to fault-find']
];

let cambios = 0;
function aplicar(objeto) {
  if (typeof objeto === 'string') {
    let t = objeto;
    REGLAS.forEach(([a, b]) => { if (t.includes(a)) { t = t.split(a).join(b); cambios++; } });
    return t;
  }
  if (Array.isArray(objeto)) return objeto.map(aplicar);
  if (objeto && typeof objeto === 'object') {
    Object.keys(objeto).forEach(k => { objeto[k] = aplicar(objeto[k]); });
    return objeto;
  }
  return objeto;
}
aplicar(s);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  reemplazos aplicados: ' + cambios);

/* CONTROL GLOBAL sobre la guia */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
const t = JSON.stringify(s2);
console.log('\n=== CONTROL GLOBAL ===');
[['6110', 'Apollo 6110'], ['\bDoppler\b', 'EQ Doppler'], ['Ten centimetres|Ten centimetres thick', '10 cm EN'],
 ['Diez centímetros', '10 cm ES'], ['adaptador DIN', 'adaptador DIN'], ['Las pajas', 'pajas'],
 ['escurrido', 'escurrido'], ['empastre', 'empastre'], ['explosivas', 'explosivas'], ['depurar', 'depurar'],
 ['\bDebugging\b', 'Debugging'], ['cancels its own interference|se cancela a sí misma', 'cable que se cancela a si mismo'],
 ['Bass disappears first|bajo desaparece primero|desaparecen primero|fáciles to cancel|faciles de cancelar|fácil de cancelar', 'el bajo desaparece primero'],
 ['Absórbelos', 'Absórbelos'], ['same 32-bit|misma salida digital de 32', '32 bits en el Signature'],
 ['Signature runs USB|Signature hace el USB', 'USB en el Signature'],
 ['thirty millimetres|treinta milímetros', '30 mm acolchado'], ['una rediseño', 'una rediseño']
].forEach(([re, et]) => console.log('  ' + String((t.match(new RegExp(re, 'g')) || []).length).padStart(3) + '  ' + et));

console.log('\n  "Fourteen centimetres" EN: ' + (t.match(/Fourteen centimetres/g) || []).length);
console.log('  "Catorce centímetros"   ES: ' + (t.match(/Catorce centímetros/g) || []).length);
console.log('  "UA 610"                 : ' + (t.match(/UA 610/g) || []).length);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);

/* resumen de los veredictos tocados */
console.log('\n=== VEREDICTOS CON "UA 610" ===');
s2.verdictProsCons.filter(v => JSON.stringify(v).includes('UA 610')).forEach(v => {
  console.log('  ' + v.name);
  console.log('    EN pros[0]: ' + v.pros[0]);
  console.log('    ES pros[0]: ' + v.pros_es[0]);
});
console.log('\n=== VEREDICTO Scarlett · contras ===');
const sc = s2.verdictProsCons[0];
console.log('  EN cons[1]: ' + sc.cons[1]);
console.log('  ES cons[1]: ' + sc.cons_es[1]);
