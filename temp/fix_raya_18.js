const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
let ok = 0; const fallos = [];

function swap(i, k, de, a, et) {
  if (!s.sections[i][k].includes(de)) { fallos.push(et); return; }
  s.sections[i][k] = s.sections[i][k].split(de).join(a); ok++;
}

// 18 EN: la raya doble dejava "—," antes de la conjuncion
swap(18, 'content',
  'Fourteen centimetres of foam is not bass trapping — G4M rates them from 200 Hz to 4 kHz —, and if you have a serious low-end problem these are the wrong tool.',
  'Fourteen centimetres of foam is not bass trapping, and G4M rates these panels from 200 Hz to 4 kHz, so if you have a serious low-end problem these are the wrong tool.',
  '18 EN raya');

// 18 ES: anadir el dato del rango, que faltaba
swap(18, 'content_es',
  'Catorce centímetros de espuma no son trampas de graves, y si tienes un problema serio de graves estos son la herramienta equivocada.',
  'Catorce centímetros de espuma no son trampas de graves: G4M especifica estos paneles de 200 Hz a 4 kHz, así que si tienes un problema serio de graves estos son la herramienta equivocada.',
  '18 ES rango');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('  cambios: ' + ok + (fallos.length ? ' | NO APLICADOS: ' + fallos.join(', ') : ' | ninguno'));

/* CONTROL */
const s2 = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'starter-studio');
console.log('\n=== SECCION 18 · frases del panel ===');
console.log('  EN: ' + (s2.sections[18].content.match(/What they will not do is fix bass[^.]*\.[^.]*\.[^.]*\./) || [''])[0]);
console.log('  ES: ' + (s2.sections[18].content_es.match(/Lo que no van a hacer es arreglar el bajo[^.]*\.[^.]*\./) || [''])[0]);
console.log('\n=== SECCION 8 · frases del panel ===');
console.log('  EN: ' + (s2.sections[8].content.match(/Panels will not fix bass[^.]*\.[^.]*\./) || [''])[0]);
console.log('  ES: ' + (s2.sections[8].content_es.match(/Los paneles no arreglan el bajo[^.]*\.[^.]*\./) || [''])[0]);
console.log('\n  "200 Hz a 4 kHz" / "200 Hz to 4 kHz": ' +
  (JSON.stringify(s2).match(/200 Hz a 4 kHz|200 Hz to 4 kHz|200 Hz–4 kHz/g) || []).length + ' menciones');
console.log('  dobles rayas "—,": ' + (JSON.stringify(s2).match(/—,/g) || []).length);
console.log('  mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
