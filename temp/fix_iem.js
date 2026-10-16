const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-in-ear-monitors');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Referencias insignia para Giras y estudio', 'Referencias insignia para giras y estudio');
swap('Estándares de la Industria y todoterrenos (gama media)', 'Estándares de la industria y todoterrenos (gama media)');
swap('lo que en sencillo significa menos artefactos de cruce', 'lo que en pocas palabras significa menos artefactos de cruce');
swap('un crossover de tres vías hasta 15Hz–20kHz, mientras', 'un crossover de tres vías hasta 15 Hz–20 kHz, mientras');
swap('con baterías recargables por USB en transmisor y bodypack.', 'con baterías recargables por USB en transmisor y petaca.');
swap('con frecuencias selecciónables para esquivar interferencias', 'con frecuencias seleccionables para esquivar interferencias');
swap('Los controles de balance, EQ y limitador en el bodypack dejan moldear', 'Los controles de balance, EQ y limitador en la petaca dejan moldear');
swap('el control manual en el bodypack suma autonomía bienvenida.', 'el control manual en la petaca suma autonomía bienvenida.');
swap('>7 mejores sistemas In-Ear inalámbricos</a>', '>Mejores sistemas In-Ear inalámbricos para directo</a>');
swap('>Sennheiser IE 900 vs SE846 Gen 2: duelo Audófilo</a>', '>Sennheiser IE 900 vs Shure SE846 Gen 2</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
