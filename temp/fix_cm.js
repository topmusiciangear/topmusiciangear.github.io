const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-condenser-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('El Neumann U 87 Ai y el AKG C414 XLII son dos de los condensadores más versátiles y respetados jamás creados',
  'El Neumann U 87 Ai y el AKG C414 XLII son dos de los condensadores más versátiles y respetados jamás creados.');
// SEC0
swap('Su calidez y su carácter se pagan con fragilidad, requisitos de alimentación y menos tolerancia al volumen',
  'Su calidez y su carácter se pagan con fragilidad, requisitos de alimentación y menos tolerancia al volumen.');
swap('La fina cinta metálica responde con un carácter plano y vintage que domestica la sibilancia y los transitorios agresivos',
  'La fina cinta metálica responde con un carácter plano y vintage que doma la sibilancia y los transitorios agresivos.');
swap('Su patrón figura-8 es un activo de producción. Rechazar los lados mientras capturas el frente y la parte trasera sirve para microfonías apretadas que necesitan control del sangrado, y facilita una toma de ambiente estéreo rica cuando se combina correctamente',
  'Su patrón en figura-8 es un activo de producción. Rechazar los lados mientras capturas el frente y la parte trasera sirve para microfonías apretadas que necesitan control de la fuga, y facilita una toma de ambiente estéreo rica cuando se combina correctamente.');
swap('Para batería y trabajo de escenario ruidoso, son la herramienta equivocada, y además frágiles',
  'Para batería y trabajo de escenario ruidoso son la herramienta equivocada, y además frágiles.');
// SEC1
swap('Cuando una voz debe sonar a disco desde que pulsas grabar, este es el micro al que recurren los ingenieros',
  'Cuando una voz tiene que sonar a disco desde que pulsas grabar, este es el micro al que recurren los ingenieros');
swap('cuyo diseño balanceado con transformador aporta peso y una presencia pulida que favorece a las voces sin aspereza',
  'cuyo diseño equilibrado con transformador aporta peso y una presencia pulida que favorece a las voces sin aspereza');
swap('y el atenuador maneja fuentes fuertes con soltura', 'y el atenuador maneja fuentes fuertes con soltura');
swap('Las voces grabadas con muchos condensadores suenan más delgadas y planas al lado de este',
  'Las voces grabadas con otros condensadores suelen sonar más delgadas y planas al lado de este');
swap('Asegúrate de que tu sala y tu previo estén a su altura antes de comprar',
  'Asegúrate de que tu sala y tu previo estén a la altura antes de comprar');
// SEC2
swap('le dan versatilidad excepcional', 'le dan una versatilidad excepcional');
swap('En overheads de batería, donde los micrófonos de cinta resultarían demasiado oscuros, ofrece un extremo superior suave y sin exageración propio de la estética de cinta',
  'En overheads de batería, donde los micrófonos de cinta resultarían demasiado oscuros, ofrece un extremo superior suave y sin exageración propio de la estética de cinta.');
swap('>guía del mejor micrófono</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
// SEC3
swap('Todo home studio empieza con un condensador honesto y barato',
  'Todo estudio casero empieza con un condensador honesto y barato');
swap('así que sobrevive tanto a amplis fuertes como a voces suaves',
  'así que aguanta tanto amplis fuertes como voces suaves');
swap('El ruido propio es 20 dB SPL, el más alto aquí, así que salas sin tratar y susurros lo delatan',
  'El ruido propio es de 20 dB SPL, el más alto de esta lista, así que las salas sin tratar y los susurros lo delatan');
// SEC4
swap('con cápsula HF6 de 1 pulgada, cardioide cerrado, 20 Hz–20 kHz y 142 dB SPL máximo',
  'con cápsula HF6 de 1 pulgada, cardioide cerrado, 20 Hz a 20 kHz y 142 dB SPL máximo');
swap('es el todoterreno', 'es el todoterreno');
// SEC5
swap('con 27,4 mV/Pa, 7 dBA de ruido, 140 dB SPL máximo)',
  'con 27,4 mV/Pa, 7 dBA de ruido y 140 dB SPL máximo)');
// SEC6
swap('Cuando piden moderno, claro y con sonido caro, este es el micro',
  'Cuando buscas un sonido moderno, claro y caro, este es el micro');
swap('con 7 dBA de ruido y 138 dB SPL máximo, con realce de presencia sobre 5 kHz',
  'con 7 dBA de ruido y 138 dB SPL máximo, con un realce de presencia sobre 5 kHz');
swap('Elígelo por definición, no por perdón', 'Elígelo por definición, no por indulgencia');
// SEC7
swap('El Warm Audio WA-8000 es un condensador de válvulas gran diafragma estilo 800 de los 90',
  'El Warm Audio WA-8000 es un condensador de válvulas de gran diafragma estilo C800 de los 90');
swap('Entrega el agudo abierto y el medio claro alrededor de los cuales se mezcla el rap, el hip-hop y el R&B — PVP $1.299',
  'Entrega el agudo abierto y el medio claro alrededor de los cuales se mezcla el rap, el hip-hop y el R&B, por $1.299');
swap('El equipo pesa 13,3 libras con su fuente externa', 'El equipo pesa 6 kg (13,3 lb) con su fuente externa');
// SEC8
swap('interruptores físicos dan pads -10/-20 dB más cortes 80/160 Hz que los baratos no tienen',
  'interruptores físicos dan pads de -10/-20 dB y cortes de 80/160 Hz que los baratos no tienen');
swap('Para voces, guitarras, batería y metales por $299, es la ganga con transformador de la guía',
  'Para voces, guitarras, batería y metales por $299, es la ganga con transformador de esta guía');
// SEC9
swap('mientras el XLR de 5 pines captura por dos previos con pad de 20 dB y 140 dB',
  'mientras el XLR de 5 pines captura por dos previos con pad de 20 dB y 140 dB');
swap('Para el brillo rap estilo C800 y recall total sin cámaras de vintage, no tiene rival aquí',
  'Para el brillo rap estilo C800 y una flexibilidad total sin cámaras de vintage, no tiene rival aquí');
// CONCLUSION + anchors
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores Micrófonos de Escenario y Directo</a>', '>Mejores micrófonos de escenario y directo</a>');
swap('>Mejores Micrófonos Económicos</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
