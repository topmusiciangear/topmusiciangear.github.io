const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Consulta primero nuestra Guía de micrófonos USB económicos', 'Consulta primero nuestra guía de micrófonos USB económicos');
// SEC1
swap('un soporte K&M 210/2 un filtro antipop Aston Shield GN', 'un soporte K&M 210/2 y un filtro antipop Aston Shield GN');
// SEC2
swap('Súmale: trae pinza y estuche pero no cable', 'Además, trae pinza y estuche pero no cable');
// SEC5
swap('así que perdona mucho en una oficina en casa o un dormitorio-estudio sin tratar y sin tratamiento acústico',
  'así que perdona mucho en una oficina en casa o un dormitorio-estudio sin tratar');
swap('un soporte K&M 210/2 La rejilla esférica ya es un filtro antipop', 'un soporte K&M 210/2. La rejilla esférica ya es un filtro antipop');
// SEC6
swap('Está construido como un tanque con construcción totalmente metálica', 'Está construido como un tanque, con cuerpo totalmente metálico');
// SEC8
swap('con un SPL máximo de 144dB', 'con un SPL máximo de 144 dB');
// SEC10
swap('El patrón estrecho rechaza monitores y sangrados', 'El patrón estrecho rechaza monitores y fugas');
// SEC12
swap('rechaza monitores y sangrados mucho mejor', 'rechaza monitores y fugas mucho mejor');
// SEC14
swap('la bobina compensadora protege tiradas largas de manguera', 'la bobina compensadora protege tiradas largas de cable');
// SEC29
swap('no hay ningún condensador a este precio que registre una sala silenciosa con menos audible',
  'no hay ningún condensador a este precio que registre una sala silenciosa con menos ruido');
// CONCLUSION + anchors
swap('>guía de mejores micrófonos</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>mejores micrófonos para podcasts</a>', '>Mejores micrófonos para podcast: guía completa</a>');
swap('>mejores micrófonos USB</a>', '>Mejores micrófonos USB para streaming</a>');
swap('>mejores micrófonos USB económicos</a>', '>Mejores micrófonos USB por menos de $110</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
