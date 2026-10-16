const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-digital-pianos');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('estos son los únicos modelos que realmente merece la pena comprar para tu hogar', 'estos son los únicos modelos que realmente merecen la pena comprar para tu hogar');
swap('Si te tomas en serio el estudio, es lo único que no puedes recortar', 'Si te tomas en serio los estudios, es lo único que no puedes recortar');
swap('los altavoces de 8W+8W rinden para un dormitorio', 'los altavoces de 8 W+8 W rinden para un dormitorio');
swap('Renuncias al Bluetooth audio, a las salidas de línea y a margen de polifonía', 'Renuncias al Bluetooth audio, a las salidas de línea y al margen de polifonía');
swap('así que el pianísimo y los pasajes rápidos se sienten fiel;', 'así que el pianísimo y los pasajes rápidos se sienten fieles;');
swap('el sistema estéreo de 22W llena una habitación', 'el sistema estéreo de 22 W llena una habitación');
swap('sistema de altavoces de 30W×2 y una interfaz', 'sistema de altavoces de 30 W×2 y una interfaz');
swap('el sistema de 8W+8W es discreto', 'el sistema de 8 W+8 W es discreto');
swap('Mantiene 10 voces y 20W×2 de amplificación', 'Mantiene 10 voces y 20 W×2 de amplificación');
swap('>guía maestra sobre los mejores teclados para músicos</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejor teclado y piano digital para el home studio</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejores teclados: piano, synth y MIDI</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
