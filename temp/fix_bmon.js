const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-monitors');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('Pasarse de tamaño es el error de monitores más común', 'Pasarse de tamaño es el error más común con monitores');
swap('El DSP incorporado y el EQ de sala pueden corregir', 'El DSP incorporado y la EQ de sala pueden corregir');
swap('/guides/budget-monitors.html\\">Best monitors menos de $500</a>', '/guides/budget-monitors_es.html\\">Mejores monitores de estudio por menos de $500</a>');
swap('/guides/best-monitors-for-small-rooms.html\\">Best monitors for small rooms</a>', '/guides/best-monitors-for-small-rooms_es.html\\">Mejores monitores de estudio para salas pequeñas</a>');
// SEC1
swap('es uno de los monitores de estudio económicos más populares que existen, y por buenas razones',
  'es uno de los monitores de estudio económicos más populares que existen, y con razón');
swap('Sueltos, son inmejorables para principiantes y habitaciones pequeñas', 'Solos, son inmejorables para principiantes y habitaciones pequeñas');
// SEC3
swap('Hecho para home studios pequeños que necesitan', 'Hecho para estudios caseros pequeños que necesitan');
// SEC4
swap('Su woofer de 8 pulgadas con cono de Kevlar baja de verdad sin subwoofer', 'Su woofer de 8 pulgadas con cono de Kevlar baja con autoridad sin subwoofer');
// SEC7
swap('/guides/adam-vs-genelec.html\\">Adam vs Genelec comparison</a>', '/guides/adam-vs-genelec_es.html\\">Adam Audio vs Genelec: tweeter, sonido y valor</a>');
swap('/guides/atc-vs-genelec.html\\">ATC vs Genelec</a>', '/guides/atc-vs-genelec_es.html\\">ATC SCM25A Pro Mk2 vs Genelec 8351B: duelo de monitores pro</a>');
// SEC8
swap('lo que eleva el costo final muy por encima', 'lo que eleva el coste final muy por encima');
swap('/guides/kh750-vs-7050c.html\\">Neumann KH 750 vs Genelec 7050C subwoofer</a>', '/guides/kh750-vs-7050c_es.html\\">Neumann KH 750 DSP vs Genelec 7050C: duelo</a>');
// SEC9
swap('con de 38 Hz a 20 kHz dentro de ±1,5 dB', 'con respuesta de 38 Hz a 20 kHz dentro de ±1,5 dB');
swap('>Comparativa Adam vs Genelec</a>', '>Adam Audio vs Genelec: tweeter, sonido y valor</a>');
// SEC10
swap('un amplificador en clase D de 400 W (1000 W de pico)', 'un amplificador en clase D de 400 W (1.000 W de pico)');
swap('/guides/studio-subwoofers_es.html\\">Configurar un subwoofer de estudio: posición y calibración</a>',
  '/guides/studio-subwoofers-setup_es.html\\">Configurar un subwoofer de estudio: posición y calibración</a>');
// SEC11
swap('va en tu escritorio mientras los satélites coaxiales', 'va sobre tu escritorio mientras los satélites coaxiales');
// SEC12
swap('El sistema biamplificado de 160W (40W + 40W por canal)', 'El sistema biamplificado de 160 W (40 W + 40 W por canal)');
swap('Para el escritorio de un apartamento pequeño, sin embargo, queda por debajo de gran parte de la competencia compacta',
  'Para el escritorio de un apartamento pequeño, sin embargo, cuesta menos que gran parte de la competencia compacta');
swap('>Mejores monitores por menos de $500</a>', '>Mejores monitores de estudio por menos de $500</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
