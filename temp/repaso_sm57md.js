const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'sm57-vs-md421');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los micrófonos dinámicos más icónicos de la historia de la grabación musical',
  'son los micrófonos dinámicos más icónicos de la historia de la grabación musical.');
swap('Todo estudio necesita un micro que funcione con casi cualquier cosa fuerte, y este es ese micro',
  'Todo estudio necesita un micro que funcione con casi cualquier cosa fuerte, y este es precisamente ese micro');
swap('se centra en la fuente y rechaza sala y filtraciones', 'se centra en la fuente y rechaza la sala y las filtraciones');
swap('una presencia media que ayuda a que la caja raje', 'una presencia media que ayuda a que la caja corte');
swap('Revisa contar con una pinza y un pie robustos', 'Asegúrate de contar con una pinza y un pie robustos');
swap('donde el original largo pelea con los pies', 'donde el original largo choca con los pies');
swap('la mezcla da mordiente más corpulencia', 'la mezcla da mordiente y corpulencia');
swap('ofrece el ataque de rango medio que los ingenieros de rock exigen', 'ofrece el ataque de medios que los ingenieros de rock exigen');
swap('para grabar una banda en vivo completa para el álbum', 'para grabar una banda en vivo completa para un álbum');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
