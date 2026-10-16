const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'sm7b-vs-nt1');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('representan los dos tipos de micrófono más populares para grabación vocal en estudio casero',
  'representan los dos tipos de micrófono más populares para grabación vocal en estudio casero.');
swap('una respuesta de frecuencia suave y cálida que domestica los agudos ásperos y minimiza las sibilancias',
  'una respuesta de frecuencia suave y cálida que doma los agudos ásperos y reduce las sibilancias');
swap('y obtener voces de calidad de transmisión', 'y obtener voces de calidad broadcast');
swap('que ayuda a las voces a cortar a través de la mezcla', 'que ayuda a las voces a abrirse paso en la mezcla');
swap('ofrece más detalle, aire y claridad de la que el SM7B puede lograr', 'ofrece más detalle, aire y claridad que el SM7B puede lograr');
swap('dan a las voces más brillo en una mezcla densa, haciéndolo mejor para la producción pop moderna',
  'dan a las voces más brillo en una mezcla densa, lo que lo hace mejor para la producción pop moderna');
swap('También es adecuado para voces agresivas, podcasting y transmisión', 'También es adecuado para voces agresivas, podcasting y streaming');
swap('>guía del mejor micrófono</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>guía del mejor micrófono para podcast</a>', '>Mejores micrófonos para podcast: guía completa</a>');
swap('El SM7B es el micro indulgente que hace que las salas sin tratar suenen profesionales',
  'El SM7B es el micro tolerante que hace que las salas sin tratar suenen profesionales');
swap('El NT1 5th Generation es el intérprete detallado que recompensa una buena sala',
  'El NT1 5th Generation es el micro detallado que recompensa una buena sala');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
