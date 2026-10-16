const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'precision-vs-jazz');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('y han estado compitiendo por el favor de los músicos desde 1960',
  'y han estado compitiendo por el favor de los músicos desde 1960.');
swap('con un mástil C-shape robusto.', 'con un mástil robusto en forma de C.');
swap('y una cejilla más estrecha de 1,5 pulgadas con un mástil cónico y delgado.', 'y una cejilla más estrecha de 1,5 pulgadas con un mástil delgado que se estrecha.');
swap('y un perfil C-shape más robusto que llena más la mano.', 'y un perfil más robusto en forma de C que llena más la mano.');
swap('El mástil se mantiene consistentemente grueso desde la cejilla hasta el talón.',
  'El mástil se mantiene grueso de forma constante desde la cejilla hasta el talón.');
swap('Es hum-cancelling por diseño, así que tienes cero ruido', 'Cancela el zumbido por diseño, así que tienes cero ruido');
swap('la cintura acerca el cuerpo a tu brazo pulsador mientras empuja la parte inferior lejos',
  'la cintura acerca el cuerpo a tu brazo de pulsación mientras aleja la parte inferior');
swap('es lo que buscas cuando la canción necesita estar en el pocket.', 'es lo que buscas cuando la canción necesita asentarse en el groove.');
swap('Ambas disponibles en la Serie Player', 'Ambos disponibles en la Serie Player');
swap('>Player Strat vs Pacifica</a>', '>Player Strat vs Yamaha Pacifica 112V: comparativa</a>');
swap('>American Pro II vs Les Paul \'60s</a>', '>American Pro II vs Les Paul \'60s: duelo de guitarras pro</a>');
swap('>Martin D-28 vs Taylor 314ce</a>', '>Martin D-28 vs Taylor 314ce: ¿mejor acústica?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
