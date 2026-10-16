const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'open-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('y la imagen estéreo parece que escucharas monitores en una sala tratada', 'y la imagen estéreo parece que escuchas monitores en una sala tratada');
swap('Si pasas horas comparando reverberaciones y ajustes de EQ, la comodidad', 'Si pasas horas comparando reverberaciones y ajustes de ecualización, la comodidad');
swap('panoramiza una guitarra potente a la izquierda y un piano potente a la derecha', 'panoramiza una guitarra potente a la izquierda y un piano con cuerpo a la derecha');
swap('revisar la imagen estéreo, evaluar la caída de la reverb y buscar frecuencias', 'revisar la imagen estéreo, evaluar la cola de la reverb y buscar frecuencias');
swap('A pesar de ser buque insignia, la impedancia es de solo 30 ohmios', 'A pesar de ser un buque insignia, la impedancia es de solo 30 ohmios');
swap('Hechos para home studios que quieren un abierto honesto', 'Hechos para estudios caseros que quieren un abierto honesto');
swap('y casi cada pieza es reemplazable.', 'y casi todas las piezas son reemplazables.');
swap('Los ATH-R70x aportan precisión profesional', 'Los ATH-R70xa aportan precisión profesional');
swap('Y el Beyerdynamic DT 900 Pro X es el punto ideal sin amplificador para home studios',
  'Y el Beyerdynamic DT 900 Pro X es el punto ideal sin amplificador para estudios caseros');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
