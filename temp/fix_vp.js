const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'vocal-plugins');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Empieza con EQ correctivo para sibilancia y retumbo.', 'Empieza con ecualización correctiva para sibilancia y retumbo.');
swap('Un limitador final atrapa los picos perdidos y mantiene', 'Un limitador final atrapa los picos sueltos y mantiene');
swap('Catorce estilos en un solo plug-in cubren por igual', 'Catorce estilos en un solo plugin cubren por igual');
swap('Celemony Melodyne 5 funciona dejándote entrar al audio', 'Celemony Melodyne 5 funciona porque te deja entrar al audio');
swap('sin el tembleque de la corrección barata.', 'sin el vibrato artificial de la corrección barata.');
swap('ayudan a que voces casi habladas se sienten junto a referencias densas', 'ayudan a que voces casi habladas se asienten junto a referencias densas');
swap('desde delays musicales y saturación de aire analógico hasta juegos de tono', 'desde delays musicales y saturación cálida analógica hasta juegos de tono');
swap('usa procesamiento algorítmico para replicar las sutiles diferencias de timing y afinación', 'usa procesamiento algorítmico para replicar las sutiles diferencias de tiempo y afinación');
swap('con procesamiento controlado de medio/lados.', 'con procesamiento controlado de mid/side.');
swap('Las voces de localización y tomas de pódcast inservibles encajan limpias', 'Las voces de localización y tomas de pódcast problemáticas encajan limpias');
swap('Con la confianza de cine, broadcast y masterización.', 'Con la confianza del cine, el broadcast y la masterización.');
swap('es exactamente el procesamiento que uso para producción vocal profesional', 'es exactamente el procesamiento que se usa para producción vocal profesional');
swap('>guía de los mejores plugins</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla Que Hacen una Diferencia Real</a>', '>Mejores plugins para producción musical: guía completa</a>');
swap('>Mejores Plugins de Mezcla y Masterización</a>', '>Mejores plugins de mezcla y masterización</a>');
swap('>Mejores Plugins de Channel Strip y Emulación de Consola</a>', '>Emulación analógica en el DAW: mejores plugins channel strip</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
