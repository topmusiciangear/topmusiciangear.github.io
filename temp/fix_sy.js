const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-synthesizers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('este poli de cuatro voces es el punto ideal.', 'este polifónico de cuatro voces es el punto ideal.');
swap('con osciladores duales engordando la fundamental.', 'con osciladores duales que engordan la fundamental.');
swap('prueba este insignia.', 'prueba este buque insignia.');
swap('>Mejor Teclado y Piano digital para Home Studio</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejores teclados: piano, synth y MIDI</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejores Pianos Digitales para Hogar y estudio</a>', '>Mejores pianos digitales para hogar y estudio</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
