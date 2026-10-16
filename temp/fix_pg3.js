const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-parlor-guitars');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Mejor vibra vintage: gretsch g9500 jim dandy', 'Mejor vibra vintage: Gretsch G9500 Jim Dandy');
swap('Mejor todo-terreno: Yamaha cSF1m', 'Mejor todo-terreno: Yamaha CSF1M');
swap('Mejor construcción boutique: PRS SE p20e tonare', 'Mejor construcción boutique: PRS SE P20E Tonare');
swap('Mejor blues box: epiphone l-00 studio', 'Mejor blues box: Epiphone L-00 Studio');
swap('Mejor thinline moderna: Fender highway series parlor', 'Mejor thinline moderna: Fender Highway Series Parlor');
swap('Mejor declaración escénica: gretsch g5021e rancher penguin', 'Mejor declaración escénica: Gretsch G5021E Rancher Penguin');
swap('escalas vintage auténticas de 61-63 cm relajan', 'escalas vintage auténticas de 61–63 cm relajan');
swap('una cejuela de 43-44 mm deja espacio', 'una cejuela de 43–44 mm deja espacio');
swap('Es para amantes del ded punteo, compositores y almas vintage', 'Es para amantes del punteo con dedos, compositores y almas vintage');
swap('La tapa sólida de pícea con varetaje festoneado proyecta', 'La tapa sólida de picea con varetaje festoneado proyecta');
swap('y aun así su bracing flotante en X cónico saca una resonancia', 'y aun así su varetaje flotante en X cónico saca una resonancia');
swap('mientras la perilla Contour barre entre una voz full-range de cantautor', 'mientras la rueda Contour barre entre una voz de rango completo de cantautor');
swap('>Mejores Guitarras Acústicas</a>', '>Mejores guitarras acústicas: Martin, Taylor y Gibson</a>');
swap('>Guitarras Acústicas para Principiantes</a>', '>Mejores guitarras acústicas para principiantes: qué comprar</a>');
swap('>Martin D-28 vs Taylor 314ce</a>', '>Martin D-28 vs Taylor 314ce: ¿mejor acústica?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
