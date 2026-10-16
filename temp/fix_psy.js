const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-synths');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Moog muse', 'Moog Muse');
swap('Sequential prophet-10', 'Sequential Prophet-10');
swap('El sintetizador insignia moderno de Moog con 8 voces contra la voz inmortal de la polifonía analógica',
  'El sintetizador insignia moderno de Moog con 8 voces contra la voz inmortal de la polifonía analógica.');
swap('Dos LFO y dos envolventes por voz más una matriz de modulación profunda hacen que el movimiento esté a un ruteo de distancia.',
  'Dos LFO y dos envolventes por voz más una matriz de modulación profunda hacen que el movimiento esté a un encaminamiento de distancia.');
swap('Frente a polisintes por software, los fondos evolutivos con esta arquitectura suenan más amplios',
  'Frente a polisintes por software, los pads evolutivos con esta arquitectura suenan más amplios');
swap('Poly-mod rutea filtro y afinación de forma musical y manual', 'Poly-mod encamina filtro y afinación de forma musical y manual');
swap('>Mejores Sintetizadores para Producción Musical</a>', '>Mejores sintetizadores para producción musical</a>');
swap('>Mejor Teclado y Piano digital para Home Studio</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Nord Stage 4 vs Montage M8x</a>', '>Nord Stage 4 vs Montage M8x: duelo de teclados insignia</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
