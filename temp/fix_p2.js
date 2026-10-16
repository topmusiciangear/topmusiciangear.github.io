const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'p225-vs-fp30x');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('así que puedes enviar a mezcladora o interfaz además del USB si tu flujo lo pide.',
  'así que puedes enviar a mesa de mezclas o interfaz además del USB si tu flujo lo pide.');
swap('>Mejores pianos digitales para casa</a>', '>Mejores pianos digitales para hogar y estudio</a>');
swap('>Mejores teclados para músicos</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Mejores teclados: piano, synth y MIDI</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
