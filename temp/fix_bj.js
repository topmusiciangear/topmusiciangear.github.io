const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'blues-junior-vs-ac30');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('Decisión de amplificador de guitarra: blues junior iV o aC30', 'Decisión de amplificador de guitarra: Blues Junior IV o AC30');
swap('son dos de los amplificadores de guitarra más icónicos jamás fabricados',
  'son dos de los amplificadores de guitarra más icónicos jamás fabricados.');
swap('el fat boost engorda los medios para solos. Ama los pedales.', 'el fat boost engorda los medios para solos. Acepta pedales de maravilla.');
swap('El Blues Junior va de calidez, respuesta al toque y ese limpio Fender', 'El Blues Junior apuesta por calidez, respuesta al toque y ese limpio Fender');
swap('El AC30 va de brillo, timbre y una complejidad armónica embriagadora', 'El AC30 apuesta por brillo, timbre y una complejidad armónica embriagadora');
swap('El Blues Junior es asequible y ligero: pesa 31 libras.', 'El Blues Junior es asequible y ligero: pesa 14 kg (31 lb).');
swap('El AC30 es pesado —70 libras— pero ofrece un sonido', 'El AC30 es pesado —32 kg (70 lb)— pero ofrece un sonido');
swap('en nuestra guía de amplificadores de guitarra y bajo Cada amplificador tiene su propio camino',
  'en nuestra guía de amplificadores de guitarra y bajo. Cada amplificador tiene su propio camino');
swap('>guía de amplificadores de guitarra y bajo</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>Mejores Amplificadores de Guitarra y Bajo</a>', '>Mejores amplificadores de guitarra y bajo: guía completa</a>');
swap('>Mejor Guitarra Eléctrica para Grabación Casera</a>', '>Mejor guitarra eléctrica para cada guitarrista</a>');
swap('>Katana 50 vs DSL40CR</a>', '>Katana 50 vs DSL40CR: ¿modelado o válvulas?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
