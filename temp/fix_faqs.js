const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');
const fixes = [
  ['una及的 de masa', 'una elevaci\u00f3n de masa'],
  ['con un ligero downward', 'con una ligera inclinaci\u00f3n hacia abajo'],
  ['\u201c v\u00eda', ''],
  ['un margen de acoplamiento. Por \u00faltimo', 'un margen de acoplamiento. Por \u00faltimo'],
  ['el computers', 'el ordenador'],
  ['computer in the room', 'ordenador en la sala'],
  ['a flow', 'un flujo'],
  ['quetaking', 'quetaking'],
  ['the right way to align', ''],
  ['el 7050C va por el otro lado', 'el 7050C va por el otro lado'],
  ['La posici\u00f3n lo es todo', 'La colocaci\u00f3n lo es todo'],
  ['La ruta pr\u00e1ctica', 'La ruta pr\u00e1ctica'],
  ['a la coupe', ''],
  ['FL con un \u2014', '']
];
let n = 0;
fixes.forEach(([a, b]) => { if (a !== b && s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(f, s, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('fixes: ' + n + ' | CJK: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
['的', '及', '轻', 'a flow', 'quetaking', '\u201d v', 'coupe'].forEach(w => {
  const c = s.split(w).length - 1;
  if (c) { const i = s.indexOf(w); console.log('!! "' + w + '" x' + c + ' :: ' + JSON.stringify(s.slice(Math.max(0, i - 60), i + 40))); }
});