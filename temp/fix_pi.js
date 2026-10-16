const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'premium-interfaces');
gg.sections[0].heading = 'What premium really buys you';
gg.sections[0].heading_es = 'Qué compras realmente cuando pagas premium';
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Estabilidad y ruteo? RME.', '¿Estabilidad y encaminamiento? RME.');
swap('gana en conectividad por libra con doce previos', 'gana en conectividad por euro con doce previos');
swap('>Mejor Interfaz para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejores Interfaces Portátiles</a>', '>Mejores interfaces de audio portátiles: guía completa</a>');
swap('>Mejores Interfaces por Menos de 300 $</a>', '>Mejores interfaces de audio por menos de $300</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
