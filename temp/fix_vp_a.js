const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/vp_a.js';
let s = fs.readFileSync(f, 'utf8');
const bad = [
  ['monitor，真正的 de tres vías', 'monitor de verdad de tres vías'],
  ['soloFilipiará cada problema', 'soloFilipiará'.slice(0, 0) + 'solo va a señalar cada problema'],
  ['un espacio mínimo', 'un espacio mínimo'],
  ['真正', 'de verdad'],
  ['空间', 'espacio'],
  ['la suavidadOUsimilar a la cinta', 'la suavidad propia de la cinta'],
  ['2进/4-salidas', '2进/4-salidas'.slice(0, 0) + '2 entradas y 4 salidas'],
  ['solo va a señalar cada problema', 'solo va a señalar cada problema']
];
let n = 0;
bad.forEach(([a, b]) => { if (s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(f, s, 'utf8');
const left = s.match(/[^\x00-\x7F\u00A0-\u024F\u00B0\u00A8\u2010-\u203A\u2013\u2014\u2019\u201C\u201D\u00D7]/g);
console.log('fixes: ' + n + ' | no latinos: ' + JSON.stringify([...new Set(left || [])]));