const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-beginner-electric-guitar');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Con 24 trastes y escala de 25,5\\", trae la velocidad', 'Con 24 trastes y escala de 25,5 pulgadas, trae la velocidad');
swap('mástil de arce en C delgado y escala de 24\\" dan cuerdas', 'mástil de arce en C delgado y escala de 24 pulgadas dan cuerdas');
swap('Una eléctrica de fibra de carbono con altavoz de 10W integrado', 'Una eléctrica de fibra de carbono con altavoz de 10 W integrado');
swap('consulta nuestra guía de la Mejor Guitarra Eléctrica para toda la gama desde precio medio hasta profesional',
  'consulta nuestra guía de la Mejor guitarra eléctrica para cada guitarrista para toda la gama desde precio medio hasta profesional');
swap('Prepara estos esenciales con tu primera guitarra. Tu presupuesto de guitarra debe incluir estos accesorios esenciales:',
  'Prepara estos esenciales con tu primera guitarra: tu presupuesto debe incluirlos.');
swap('Los estudios muestran que practicas 3 veces más cuando la guitarra está visible y accesible',
  'La experiencia dice que practicas mucho más cuando la guitarra está visible y accesible');
swap('Squier Affinity Strat: el ajuste importa más que las specs', 'Squier Affinity Strat: el ajuste importa más que las especificaciones');
swap('Jet Guitars JS-300: mástil de maple tostado, nombre desconocido', 'Jet Guitars JS-300: mástil de arce tostado, nombre desconocido');
swap('Quien práctica a diario en el sofá avanzará más rápido', 'Quien practica a diario en el sofá avanzará más rápido');
swap('Elijas la que elijas, presupuesta un ajuste profesional y un buen amplificador', 'Elijas la que elijas, reserva presupuesto para un ajuste profesional y un buen amplificador');
swap('>guía de la Mejor Guitarra Eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>guía de la mejor guitarra para home office</a>', '>Mejores guitarras para trabajar desde casa</a>');
swap('>guía de los mejores amplificadores de guitarra</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>guía de guitarra para principiantes</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
swap('>Mejor Guitarra Eléctrica</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Mejores Guitarras para Principiantes y Composición</a>', '>Mejores guitarras para principiantes: guía para empezar</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
