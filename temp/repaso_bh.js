const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('Abiertos, cerrados, de estudio, gaming — el mercado de auriculares es amplio',
  'Abiertos, cerrados, de estudio o gaming: el mercado de auriculares es amplio.');
// SEC0
swap('te empujan a un EQ correctivo que arruina la mezcla', 'te empujan a una ecualización correctiva que arruina la mezcla');
swap('están pensados para equipos de auriculares en condiciones', 'están pensados para equipos con amplificación dedicada en condiciones');
// SEC2
swap('con un escenario amplio y con profundidad que se parece más a unos monitores',
  'con un escenario amplio y profundidad que se parece más a unos monitores');
// SEC3
swap('unos graves profundos que enganchan, plegándose para la mochila entre medias',
  'unos graves profundos que enganchan, plegándose para la mochila');
// SEC4
swap('pruebas rápidas junto a unos hi-fi más relajados', 'pruebas rápidas junto a unos auriculares hi-fi más relajados');
// SEC6
swap('(3 incluidos: en espiral, corto y largo) soportan el ajetreo', '(3 incluidos: en espiral, corto y largo) aguantan el ajetreo');
swap('Están entre los auriculares cerrados más precisos.', 'Están entre los auriculares cerrados más precisos de su rango.');
// SEC7
swap('obliga a decisiones difíciles de EQ', 'obliga a decisiones difíciles de ecualización');
// SEC10
swap('y su presión ligera va mejor en cabezas pequeñas que grandes', 'y su presión ligera se adapta mejor a cabezas pequeñas que grandes');
// SEC12
swap('con un vasto diafragma de 106 x 110 mm', 'con un enorme diafragma de 106 x 110 mm');
// CONCLUSION (primera persona fuera)
swap('Tengo los cuatro y uso diferentes según el trabajo. Si solo pudiera quedarme con uno, sería el HD 490 Pro Plus — pero es porque mezclo más de lo que grabo',
  'Los cuatro tienen su sitio y cada uno se usa según el trabajo. Si hubiera que quedarse con uno solo, sería el HD 490 Pro Plus, porque se mezcla más de lo que se graba');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
