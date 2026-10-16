const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'xr18-vs-cq18t');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('con procesamiento de 96kHz y pantalla táctil integrada..', 'con procesamiento de 96 kHz y pantalla táctil integrada.');
swap('La app gratuita iPad/Android te da control total sobre EQ, dinámica, efectos y enrutamiento desde cualquier lugar.',
  'La app gratuita iPad/Android te da control total sobre EQ, dinámica, efectos y encaminamiento desde cualquier lugar.');
swap('El CQ-18T procesa 96kHz frente a los 48kHz del XR18.', 'El CQ-18T procesa 96 kHz frente a los 48 kHz del XR18.');
swap('es el mezclador portátil más innovador con procesamiento de 96kHz, pantalla táctil', 'es el mezclador portátil más innovador con procesamiento de 96 kHz, pantalla táctil');
swap('>Mejores Mezcladores de Sonido en Vivo para Bandas y Eventos</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Mezcladores Digitales para Bandas y Sonido en Vivo</a>', '>Mejores mezcladores digitales: guía completa</a>');
swap('>Mejores Mezcladores Compactos para Bandas y Home Studios</a>', '>Mejores mezcladores Digitales de rack con control tablet</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
