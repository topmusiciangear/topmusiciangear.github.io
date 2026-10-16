const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-drum-machines');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('contra la potencia de producción autónoma de Estados Unidos',
  'contra la potencia de producción autónoma de Estados Unidos.');
swap('es una potente máquina de ritmos y sampler construido alrededor', 'es una potente máquina de ritmos y sampler construida alrededor');
swap('un sistema de producción musical standalone completo con procesador de 8 núcleos, 8GB RAM, 128GB de almacenamiento',
  'un sistema de producción musical autónomo completo con procesador de 8 núcleos, 8 GB de RAM, 128 GB de almacenamiento');
swap('significan parameter locks, trigs condiciónales y micro-timing', 'significan parameter locks, trigs condicionales y micro-timing');
swap('Un motor de ocho núcleos con buena RAM y almacenamiento interno mueve', 'Un motor de ocho núcleos con 8 GB de RAM y almacenamiento interno mueve');
swap('Micro integrado, altavoces estéreo y batería recargable permiten', 'Micrófono integrado, altavoces estéreo y batería recargable permiten');
swap('>Mejores Máquinas de Batería y Producción de Beats</a>', '>Mejores cajas de ritmos y grooveboxes: guía completa</a>');
swap('>Digitakt II vs TR-8S</a>', '>Digitakt II vs TR-8S: ¿mejor máquina de batería para ti?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
