const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-stage-keyboards');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Sin bucear en menús a mitad de tema, sin notas cortadas entre parches, sin peso muerto que temiéramos cargar.',
  'Sin bucear en menús a mitad de tema, sin notas cortadas entre parches, sin peso muerto que temer cargar.');
swap('Comparamos los 9 mejores teclados para directo en 2026 —del Nord Electro 7 de 8,3 kg a workstations insignia de 28 kg— por lo que importa',
  'Aquí están los 9 mejores teclados para directo —del Nord Electro 7 de 8,3 kg a workstations insignia de 28 kg— por lo que importa');
swap('El Yamaha YC88 une la agresividad del órgano rock clásico con un gran cola de verdad:',
  'El Yamaha YC88 une la agresividad del órgano rock clásico con una gran cola de verdad:');
swap('Si el presupuesto es mortal y el calendario va lleno, este es el dinero listo.',
  'Si el presupuesto aprieta y el calendario va lleno, este es el dinero bien gastado.');
swap('>Mejores teclados: piano, synth y MIDI</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejores pianos digitales</a>', '>Mejores pianos digitales para hogar y estudio</a>');
swap('>Nord Stage 4 vs Montage M8x</a>', '>Nord Stage 4 vs Montage M8x: duelo de teclados insignia</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
