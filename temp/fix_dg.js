const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'digitakt-ii-vs-tr8s');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son las dos máquinas de batería y samplers más potentes del mercado. El Digitakt II es un sampler profundo',
  'son las dos máquinas de ritmo y sampling más potentes del mercado. El Digitakt II es un sampler profundo');
swap('El TR-8S ofrece sonidos de batería Roland auténticos con modelado ACB',
  'El TR-8S ofrece sonidos de batería Roland auténticos con modelado ACB.');
swap('y el secuenciador por pasos con bloqueos, disparos condiciónales y micro-tiempo mantiene',
  'y el secuenciador por pasos con bloqueos, disparos condicionales y micro-tiempo mantiene');
swap('Valora si disfrutas el flujo de menús con mandos y organiza tu librería', 'Ten en cuenta si disfrutas el flujo de menús con mandos y organiza tu librería');
swap('Perfecta para creadores manuales.', 'Perfecta para creadores que prefieren tocar.');
swap('elige según tu preferencia de proceso.', 'elige según tu preferencia de flujo.');
swap('>Mejores Máquinas de Batería y Producción de Beats</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
swap('>Mejores samplers y ordenadores de Batería para Creadores de Beats</a>', '>Mejores samplers y creación de beats: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
