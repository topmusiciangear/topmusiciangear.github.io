const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-daw');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('contra Pro Tools Studio para grabación, edición y mezcla',
  'contra Pro Tools Studio para grabación, edición y mezcla.');
swap('Incluye Max for Live, 70+ GB de sonidos, Roar saturación, MIDI Polyphonic Expression',
  'Incluye Max for Live, 70+ GB de sonidos, saturación Roar, MIDI Polyphonic Expression');
swap('Pistas de audio y MIDI ilimitadas, audio de 32-bit/192kHz y el motor', 'Pistas de audio y MIDI ilimitadas, audio de 32 bits/192 kHz y el motor');
swap('>Mejor Software de Producción Musical</a>', '>Mejor software DAW: guía completa</a>');
swap('>Mejor DAW para Principiantes</a>', '>Mejor DAW para principiantes</a>');
swap('>Ableton Live vs FL Studio</a>', '>Ableton Live vs FL Studio: ¿cuál es mejor para ti?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
