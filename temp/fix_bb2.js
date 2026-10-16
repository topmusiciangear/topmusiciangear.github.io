const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'budget-bass-like-expensive');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El previo activo de 9V ofrece graves gruesos y agudos definidos con una sola perilla de volumen', 'El previo activo de 9V ofrece graves gruesos y agudos definidos con una sola rueda de volumen');
swap('Las pastillas mandan su señal directo a las perillas de volumen y tono', 'Las pastillas mandan su señal directo a las ruedas de volumen y tono');
swap('mástil C de maple duro tostado con bordes Edgeless', 'mástil C de arce duro tostado con bordes Edgeless');
swap('mientras el mástil Thin C de maple con 6 pernos', 'mientras el mástil Thin C de arce con 6 pernos');
swap('un rápido mástil fino en U de 5 piezas maple/jatoba', 'un rápido mástil fino en U de 5 piezas arce/jatoba');
swap('no un vintage con personalidad propria.', 'no un vintage con personalidad propia.');
swap('mientras el mástil Modern C de maple con bordes redondeados mantiene', 'mientras el mástil Modern C de arce con bordes redondeados mantiene');
swap('y el mástil Modern C de maple con trastes medium jumbo resulta', 'y el mástil Modern C de arce con trastes medium jumbo resulta');
swap('Nota del editor: átalas a través del cuerpo a 45 grados.', 'Nota del editor: pásalas a través del cuerpo a 45 grados.');
swap('así que mantienen el afinado y no se mueren antes de tiempo', 'así que mantienen la afinación y no se mueren antes de tiempo');
swap('tres miniswitches para selección de pastilla, ruteo serie/paralelo y operación pasiva/activa',
  'tres miniswitches para selección de pastilla, encaminamiento serie/paralelo y operación pasiva/activa');
swap('>Mejores Guitarras Acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Mejores Bajos</a>', '>Mejores bajos por menos de $700</a>');
swap('>Los Mejores Bajos Fender para Cada Género</a>', '>Los mejores bajos Fender para cada género</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
