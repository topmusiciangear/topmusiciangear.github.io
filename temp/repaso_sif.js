const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'streaming-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Los siete de aquí caen en cuatro bandos.', 'Los siete de aquí caen en cuatro grupos.');
swap('Decide qué bando coincide con cómo creas.', 'Decide qué grupo coincide con cómo creas.');
swap('>Mejores interfaces de audio</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejores controladores de streaming</a>', '>Alternativas a Stream Deck y mejores mezcladores</a>');
swap('Lo que amo de él en directo es el control total.', 'Lo mejor en directo es el control total.');
swap('deja que un segundo PC se una a la fiesta.', 'deja que un segundo PC se sume al equipo.');
swap('esta es la que se siente como una consola de radio real cada día.', 'esta es la que funciona como una consola de radio real cada día.');
swap('te da mezclas independientes para tu directo y las auriculares', 'te da mezclas independientes para tu directo y los auriculares');
swap('El trato honesto. Topa en 48kHz/24-bit sin 32-bit float', 'El trato honesto. Se queda en 48 kHz/24 bits sin 32 bits flotantes');
swap('La Yamaha URX44V es el streamer que superó la caja de dos canales.', 'La Yamaha URX44V es la interfaz que superó la caja de dos canales.');
swap('Acompañar a principiantes del desembalaje a una maqueta terminada en una tarde resulta fácil',
  'Llevar a un principiante del desembalaje a una maqueta terminada en una tarde resulta fácil');
swap('El Audient EVO 4 es el streamer económico que se ajusta solo.', 'El Audient EVO 4 es la interfaz económica que se ajusta sola.');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
