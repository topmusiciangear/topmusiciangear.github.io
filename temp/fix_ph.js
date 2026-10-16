const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-headphones');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('valorado por ingenieros galardonados en todo el mundo',
  'valorado por ingenieros galardonados en todo el mundo.');
swap('con el diseño de driver preciso y confiable del LCD-X, con el array', 'con el diseño de driver preciso y fiable del LCD-X, con el array');
swap('el LCD-X es el estándar profesional con confiabilidad probada.', 'el LCD-X es el estándar profesional con fiabilidad probada.');
swap('con el diseño de driver preciso y confiable del LCD-X.', 'con el diseño de driver preciso y fiable del LCD-X.');
swap('Con drivers magnéticos planares de 106mm, respuesta de 10Hz-50kHz y sensibilidad de 105dB, el LCD-MX4',
  'Con drivers magnéticos planares de 106 mm, respuesta de 10 Hz-50 kHz y sensibilidad de 105 dB, el LCD-MX4');
swap('una combinación destacada de transparencia y confiabilidad.', 'una combinación destacada de transparencia y fiabilidad.');
swap('Con drivers magnéticos planares de 106mm, respuesta de 10Hz-50kHz y sensibilidad de 103dB, el LCD-X',
  'Con drivers magnéticos planares de 106 mm, respuesta de 10 Hz-50 kHz y sensibilidad de 103 dB, el LCD-X');
swap('>Mejores Auriculares de estudio Económicos</a>', '>Mejores auriculares de estudio por menos de $150</a>');
swap('>Mejores Auriculares Abiertos para Mezcla</a>', '>Mejores auriculares abiertos: guía completa</a>');
swap('>Mejores Auriculares Cerrados para Mezcla y Grabación</a>', '>Mejores auriculares cerrados para grabar y aislar la voz</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
