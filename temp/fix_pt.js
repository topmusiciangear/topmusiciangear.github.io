const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-tools-vs-cubase');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Compra Avid Pro Tools Studio si trabajas en estudios profesionales: es lo que los estudios profesionales esperan para grabación, edición y compatibilidad de sesiones. Pro Tools sigue siendo el DAW que los estudios profesionales esperan. Su edición de audio es la más precisa',
  'Compra Avid Pro Tools Studio si trabajas en estudios profesionales: es lo que esperan para grabación, edición y compatibilidad de sesiones. Su edición de audio es la más precisa');
swap('El Avid Audio Engine ofrece una latencia extremadamente baja. Si trabajas en estudios profesionales, Pro Tools es indispensable para la compatibilidad y el intercambio de sesiones.',
  'El Avid Audio Engine ofrece una latencia extremadamente baja. Es indispensable para la compatibilidad y el intercambio de sesiones.');
swap('Pro Tools conserva un flujo de trabajo de máquina de cinta familiar para los ingenieros de grabación analógica, mientras que Cubase evolucionó desde la composición MIDI hasta convertirse en un DAW de producción completo con mejor notación. Pro Tools conserva un flujo de trabajo de máquina de cinta familiar para los ingenieros formados en consolas analógicas. Cubase evolucionó desde sus raíces en la composición MIDI hasta convertirse en un DAW de producción completo. Pro Tools tiene mejor edición',
  'Pro Tools conserva un flujo de trabajo de máquina de cinta familiar para los ingenieros formados en consolas analógicas, mientras que Cubase evolucionó desde sus raíces en la composición MIDI hasta convertirse en un DAW de producción completo. Pro Tools tiene mejor edición');
swap('>guía de DAWs</a>', '>Mejor software DAW: guía completa</a>');
swap('>guía del mejor DAW para principiantes</a>', '>Mejor DAW para principiantes</a>');
swap('>Mejor Software de Producción Musical</a>', '>Mejor software DAW: guía completa</a>');
swap('>Mejor Teclado y Piano digital para Home Studio</a>', '>Mejores teclados y controladores MIDI: piano, synth y DAW</a>');
swap('>Ableton Live vs FL Studio</a>', '>Ableton Live vs FL Studio: ¿cuál es mejor para ti?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
