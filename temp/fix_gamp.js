const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-mic-for-guitar-amps');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
// Heading
swap('¿Es el Sennheiser mD 421 kompakt el mejor micrófono dinámico', '¿Es el Sennheiser MD 421 Kompakt el mejor micrófono dinámico');
// SEC0
swap('Es una de las razones por las que el SM57 se convirtió en el estándar para guitarra',
  'Es una de las razones por las que el SM57 se convirtió en el estándar para guitarra.');
// SEC1
swap('aprieta los graves, añade empuje en medios alrededor de 5 kHz', 'recorta los graves, añade empuje en medios alrededor de 5 kHz');
swap('>comparativa SM57 vs SM58</a>', '>SM57 vs SM58: ¿cuál para voz y amplis? (prueba real)</a>');
// SEC4
swap('Aquí están los parámetros básicos:', 'Aquí están los principios básicos:');
swap('Apuntando el micrófono directamente al altavoz (on-axis) se obtiene el sonido más directo',
  'Apuntar el micrófono directamente al altavoz (on-axis) da el sonido más directo');
swap('Inclinándolo 30-45 grados (off-axis) se doman las frecuencias agudas agresivas',
  'Inclinarlo 30-45 grados (off-axis) doma las frecuencias agudas agresivas');
swap('Alejándolo 2-6 pulgadas se introduce la cancelación de fase natural', 'Alejarlo 2-6 pulgadas introduce la cancelación de fase natural');
swap('Veinte minutos de prueba pueden ahorrarte horas de EQ después', 'Veinte minutos de prueba pueden ahorrarte horas de ecualización después');
// SEC5
swap('cuesta el doble que el SM57 ATA y sigue necesitando interfaz', 'cuesta el doble que el SM57 y sigue necesitando interfaz');
// SEC6
swap('y por unos $99 en la calle cuesta menos que los clásicos', 'y por unos $99 de precio de calle cuesta menos que los clásicos');
// CONCLUSION anchors
swap('>Mejores micrófonos</a>', '>Mejor micrófono para voces y grabación casera: guía completa</a>');
swap('>Mejores micrófonos económicos</a>', '>Mejores micrófonos XLR económicos para estudio</a>');
swap('>SM57 vs MD421</a>', '>SM57 vs MD 421 Kompakt: ¿mejor micro para amplis?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
