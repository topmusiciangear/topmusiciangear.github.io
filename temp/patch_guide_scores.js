// Actualiza SOLO los valores del bloque best-monitors-for-small-rooms en js/guide-scores.js
// (reemplazo quirúrgico de valores, sin re-serializar el resto del archivo).
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let raw = fs.readFileSync(B + 'js/guide-scores.js', 'utf8');

// límites del bloque
const key = '"best-monitors-for-small-rooms": {';
const kIdx = raw.indexOf(key);
if (kIdx === -1) throw new Error('bloque no encontrado');
const start = kIdx + key.length;
// fin del bloque: el ' }' en la misma profundidad (el bloque son entradas "X": N,\n }
let end = raw.indexOf('\r\n }', start);
if (end === -1) end = raw.indexOf('\n }', start);
if (end === -1) throw new Error('fin del bloque no encontrado');
const block = raw.slice(start, end);

// [clave, valorViejo, valorNuevo]
const updates = [
  ['JBL 305P MkII', '9.2', '8.7'],
  ['Yamaha HS5', '8.9', '8.4'],
  ['ADAM Audio D3V', '9', '8.9'],
  ['Kali Audio LP-UNF', '9', '8.9'],
  ['Kali Audio LP-6 V2', '9.5', '9.5'],
  ['IK Multimedia iLoud Micro Monitor Pro', '9.1', '9.6'],
  ['Neumann KH 80 DSP', '9.6', '9.8'],
  ['IK Multimedia iLoud MTM MKII', '9.2', '9.3'],
  ['Genelec 8010A', '9.5', '9.4'],
  ['ADAM Audio T5V', '8.9', '8.6'],
  ['Genelec 8030C', '9.8', '9.0'],
  ['KRK Rokit 5 G5', '8.7', '9.2'],
  ['PreSonus Eris Studio 5', '8.9', '8.8']
];

let newBlock = block;
updates.forEach(([name, oldS, newS]) => {
  if (oldS === newS) { console.log('sin cambio: ' + name + ' (' + oldS + ')'); return; }
  const needle = '"' + name + '": ' + oldS;
  const c = newBlock.split(needle).length - 1;
  if (c !== 1) throw new Error('"' + needle + '" aparece ' + c + ' veces en el bloque (esperaba 1)');
  newBlock = newBlock.replace(needle, '"' + name + '": ' + newS);
  console.log('OK: ' + name + ': ' + oldS + ' → ' + newS);
});

if (newBlock === block) { console.log('nada que cambiar'); process.exit(0); }
raw = raw.slice(0, start) + newBlock + raw.slice(end);
fs.writeFileSync(B + 'js/guide-scores.js', raw);

// verificación: eval y comprobar
delete global.GUIDE_SCORES;
eval(fs.readFileSync(B + 'js/guide-scores.js', 'utf8'));
const e = GUIDE_SCORES['best-monitors-for-small-rooms'];
const expect = { 'Neumann KH 80 DSP': 9.8, 'IK Multimedia iLoud Micro Monitor Pro': 9.6, 'Kali Audio LP-6 V2': 9.5, 'Genelec 8010A': 9.4, 'IK Multimedia iLoud MTM MKII': 9.3, 'KRK Rokit 5 G5': 9.2, 'Genelec 8030C': 9.0, 'ADAM Audio D3V': 8.9, 'Kali Audio LP-UNF': 8.9, 'PreSonus Eris Studio 5': 8.8, 'JBL 305P MkII': 8.7, 'ADAM Audio T5V': 8.6, 'Yamaha HS5': 8.4 };
let ok = true;
Object.keys(expect).forEach(k => { if (e[k] !== expect[k]) { console.log('MISMATCH', k, e[k], '!=', expect[k]); ok = false; } });
console.log('total guías:', Object.keys(GUIDE_SCORES).length, '| entradas small-rooms:', Object.keys(e).length);
// spot-check de otra guía intacta
console.log('spot-check ableton-vs-logic:', JSON.stringify(GUIDE_SCORES['ableton-vs-logic']));
if (!ok) throw new Error('verificación falló');
console.log('VERIFICADO: js/guide-scores.js con los scores finales por guía');
