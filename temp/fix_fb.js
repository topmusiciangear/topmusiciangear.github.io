const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'fender-bass-guide');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('El P-Bass tiene una cejilla más ancha de 1.625 pulgadas con un C-shape robusto', 'El P-Bass tiene una cejilla más ancha de 1.625 pulgadas con un mástil robusto en forma de C');
swap('El J-Bass tiene un mástil cónico más delgado de 1,5 pulgadas', 'El J-Bass tiene un mástil más delgado de 1,5 pulgadas que se estrecha');
swap('en cualquier mezcla sin necesidad de esculpir EQ.', 'en cualquier mezcla sin necesidad de esculpir la ecualización.');
swap('El mástil C-shape se siente sustancial y sólido', 'El mástil en forma de C se siente sustancial y sólido');
swap('Mejor para: Rock, punk, Motown, country, classic rock, reggae.', 'Mejor para: rock, punk, Motown, country, rock clásico, reggae.');
swap('se sienta en el pocket y se queda allí.', 'se sienta en el groove y se queda allí.');
swap('Mejor para: Funk, R&B, Latin jazz, fusión, soul, neo-soul, gospel.', 'Mejor para: funk, R&B, latin jazz, fusión, soul, neo-soul, gospel.');
swap('ofrece armónicos más ricos y más punch que nunca', 'ofrece armónicos más ricos y más pegada que nunca');
swap('Este es el P-Bass para profesionales que necesitan confiabilidad y tono', 'Este es el P-Bass para profesionales que necesitan fiabilidad y tono');
swap('Fender American Professional II Jazz Bass: la potencia de latino, fusión y soul',
  'Fender American Professional II Jazz Bass: la potencia de música latina, fusión y soul');
swap('El Ultra II es lo que Fender construye cuando deja deanorzar.', 'El Ultra II es lo que Fender construye cuando deja de ahorrar.');
swap('El mástil de maple de cuartos Modern D con radio compuesto', 'El mástil de arce de corte radial Modern D con radio compuesto');
swap('permite bending suaves sin dejar de sentirse plano', 'permite bendings suaves sin dejar de sentirse plano');
swap('Squier Classic Vibe \'60s Jazz Bass: specs vintage, precio de principiante',
  'Squier Classic Vibe \'60s Jazz Bass: especificaciones vintage, precio de principiante');
swap('sobre un cuerpo ligero de álamo con mástil C de maple y 20 trastes.', 'sobre un cuerpo ligero de álamo con mástil C de arce y 20 trastes.');
swap('>P-Bass vs J-Bass</a>', '>P-Bass vs J-Bass: ¿cuál bajo Fender es el tuyo?</a>');
swap('>Mejores Bajos para Principiantes</a>', '>Mejores bajos para principiantes: guía para empezar</a>');
swap('>Mejores Bajos Baratos Que Suenan Como Caros</a>', '>Bajos con mejor relación calidad-precio que suenan premium</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
