const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'dxr-vs-prx');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// INTRO
swap('representan dos filosofías completamente diferentes para el sonido en vivo',
  'representan dos filosofías completamente distintas para el sonido en vivo portátil.');
// SEC0
swap('la respuesta neutra de Yamaha consigue presentaciones', 'la respuesta neutra de Yamaha saca adelante la actuación');
swap('La eficiente amplificación Clase-D mueve el woofer', 'La eficiente amplificación en Clase D alimenta el woofer');
swap('Las salas sonorizadas con cajas neutras de esta clase junto a rivales con graves pasados suelen pedir mucha menos ecualización',
  'Las salas sonorizadas con cajas neutras de esta clase suelen pedir mucha menos ecualización que con rivales de graves pasados');
swap('Ideales para bandas, DJs y locales que buscan una respuesta fiable', 'Ideal para bandas, DJs y locales que buscan una respuesta fiable');
// SEC1
swap('que cuenta con audio Clase 1 Bluetooth, supresión automática de retroalimentación y compresión dbx profesionales',
  'con Bluetooth de clase 1, supresión automática de acoples y compresión dbx profesional');
swap('El mezclador incorporado elimina la necesidad de una consola de mezcla separada, haciéndolo ideal para solistas',
  'El mezclador incorporado elimina la necesidad de una mesa de mezclas aparte, lo que lo hace ideal para solistas');
// SEC2
swap('El DXR12mkII ofrece máxima flexibilidad como componente en un sistema escalable, mientras que el PRX ONE ofrece una comodidad excepcional y una configuración rápida para actos solistas. El DXR12mkII ofrece máxima flexibilidad como componente PA tradicional que puedes usar en cualquier configuración.',
  'El DXR12mkII ofrece máxima flexibilidad como componente de un sistema escalable que puedes usar en cualquier configuración, mientras que el PRX ONE ofrece una comodidad excepcional y un montaje rápido para solistas.');
swap('Pero el PRX ONE no puede igualar la salida bruta del DXR12mkII para lugares más grandes, y su diseño integrado limita las opciones de ampliar el sistema',
  'Pero el PRX ONE no puede igualar la salida bruta del DXR12mkII para recintos más grandes, y su diseño integrado limita las posibilidades de ampliación');
// SEC3
swap('Si buscas un altavoz autoamplificado tradicional que se integre con sistemas PA existentes y escale para eventos mayores',
  'Si buscas un altavoz activo tradicional que se integre con sistemas PA existentes y crezca para eventos mayores');
swap('El DXR12mkII es para profesionales que construyen sistemas escalables', 'El DXR12mkII es para profesionales que montan sistemas escalables');
swap('El PRX ONE es para músicos que quieren llegar y sonar genial rápidamente', 'El PRX ONE es para músicos que quieren llegar, enchufar y sonar bien en minutos');
swap('>guía de PA para sonido en vivo</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
// CONCLUSION
swap('para profesionales que construyen sistemas escalables', 'para profesionales que montan sistemas escalables');
swap('>Mejores Sistemas PA para Bandas</a>', '>Mejores sistemas PA para sonido en vivo: guía completa</a>');
swap('>Mejores Micrófonos Inalámbricos para Escenario</a>', '>Mejores sistemas de micrófono inalámbricos para escenario</a>');
swap('>EV ZLX-12P vs QSC K12.2</a>', '>EV ZLX-12P-G2 vs QSC K12.2: ¿mejor PA activo?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
