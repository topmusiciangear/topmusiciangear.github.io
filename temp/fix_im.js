const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-instrument-mics');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// SEC0
swap('Para el midrange clásico del rock', 'Para el medios clásico del rock');
swap('Juntos son el configuración de dos micros más usado', 'Juntos son la configuración de dos micros más usada');
// SEC1
swap('para un bottom moderno y contundente', 'para unos graves modernos y contundentes');
// SEC5
swap('Un configuración de batería clásico combina', 'Una configuración de batería clásica combina');
// SEC8
swap('aun cuando el sangrado escénico amenaza con caos', 'aun cuando la fuga del escenario amenaza con caos');
swap('un previolificación generosa resulta obligatoria', 'una preamplificación generosa resulta obligatoria');
// SEC11
swap('sin necesidad de EC', 'sin necesidad de ecualización');
// SEC12
swap('con un graves rico y sin prisas', 'con unos graves ricos y sin prisas');
// SEC14
swap('Con 849 $ además está competes con condensadores', 'Con 849 $ además compite con condensadores');
// SEC16
swap('quita el acumulación de graves', 'quita la acumulación de graves');
// SEC17
swap('El pad cubre los casos、diabetes', 'El pad cubre los casos de fuentes fuertes');
// SEC18
swap('Para un violinista o violonchelistaViolationista en solitario', 'Para un violinista o violonchelista en solitario');
// SEC20
swap('el patrón supercardioide es más cerrado que el cardioide del SM57/Beta 58A',
  'el patrón supercardioide es más cerrado que el cardioide del SM58');
// CONCLUSION + anchors
swap('>Mejor Micrófono para Voces y Grabación Casera</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejor Micrófono Dinámico para Grabar Amplificadores de Guitarra en Casa</a>', '>Mejores micrófonos dinámicos para grabar amplis en casa</a>');
swap('>SM57 vs MD 421 Kompakt</a>', '>SM57 vs MD 421 Kompakt: ¿mejor micro para amplis?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
