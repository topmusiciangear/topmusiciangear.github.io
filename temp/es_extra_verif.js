// Verificar los 10 arreglos y que no queden restos
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const raw = fs.readFileSync(F, 'utf8');
const g = JSON.parse(raw);
const guia = g.find(x => x.id === 'starter-studio');
const json = JSON.stringify(guia);

const VIEJOS = [
  'te wish suerte', 'Necessary Adelantan', 'también serves para',
  'woofer de ocho pulgadas', 'midrange de cuatro', '140 vatios',
  '250 ohmios de robustez', '250 ohms of ruggedness',
  'un ampliador pequeño', 'por traducción, no por comodidad',
  'Buy it for translation', '</strong> plana, honesta', 'cifras de| líder', 'a extravagance'
];
const NUEVOS = [
  'te desea suerte', 'que hacen avanzar una guitarra también hacen retroceder',
  'también sirven para grabar',
  'aramida de Kevlar trenzado de 7 pulgadas', 'tweeter de cúpula de seda de 1 pulgada', '145 vatios en total',
  'Un cuerpo que ha sobrevivido décadas de caídas', 'A body that has survived decades of being dropped',
  'un amplificador pequeño', 'Cómpralo por lo que te dice de tu mezcla',
  'Buy it for what it tells you about your mix', '</strong> Plana, honesta', 'cifras de líder', 'an extravagance'
];

console.log('=== RESTOS DE LOS ERRORES VIEJOS ===');
let limpios = 0;
VIEJOS.forEach(v => {
  const n = (raw.match(new RegExp(v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n) { console.log('  MAL x' + n + '  "' + v + '"'); } else limpios++;
});
console.log('  ' + limpios + '/' + VIEJOS.length + ' errores eliminados');

console.log('\n=== TEXTOS NUEVOS PRESENTES ===');
let ok = 0;
NUEVOS.forEach(v => {
  const hay = json.indexOf(v) > -1;
  if (hay) ok++;
  console.log('  ' + (hay ? 'ok  ' : 'FALTA ') + '"' + v.slice(0, 60) + '"');
});
console.log('  ' + ok + '/' + NUEVOS.length);

// paridad de longitud EN/ES en las secciones tocadas
console.log('\n=== PARIDAD ===');
console.log('  secciones: ' + guia.sections.length +
  ' | sin content_es: ' + guia.sections.filter(s => !s.content_es).length +
  ' | sin heading_es: ' + guia.sections.filter(s => !s.heading_es).length);
const vp = guia.verdictProsCons;
console.log('  veredictos: ' + vp.length +
  ' | sin pros_es: ' + vp.filter(v => !v.pros_es).length +
  ' | sin cons_es: ' + vp.filter(v => !v.cons_es).length);
let mal4 = 0;
vp.forEach(v => {
  if (v.pros.length < 4 || v.cons.length < 4 || v.pros_es.length < 4 || v.cons_es.length < 4) mal4++;
});
console.log('  veredictos con menos de 4+4: ' + mal4);

// recuento de palabras inglesas sueltas en el ES de esta guia
console.log('\n=== POSIBLES RESTOS DE INGLES EN EL ES ===');
['wish ', 'necessary ', 'serves ', 'ampliador', 'traducción, no', 'cifras de|'].forEach(w => {
  const n = (JSON.stringify(guia.sections.map(s => s.content_es).join(' ') + JSON.stringify(vp.map(v => v.pros_es.concat(v.cons_es)))).match(new RegExp(w, 'g')) || []).length;
  console.log('  ' + (n ? 'MAL x' + n + ' ' : 'ok      ') + '"' + w.trim() + '"');
});
