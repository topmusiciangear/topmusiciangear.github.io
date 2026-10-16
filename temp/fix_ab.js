const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'apollo-vs-babyface');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('representan los dos pesos pesados del mercado de interfaces de audio premium de escritorio',
  'representan los dos pesos pesados del mercado de interfaces de audio premium de escritorio.');
swap('en una interfaz de tamaño medio rack', 'en una interfaz de tamaño medio rack');
swap('Compara ambas interfaces lado a lado en nuestra guía de la mejor interfaz de audio Si tus sesiones',
  'Compara ambas interfaces frente a frente en nuestra guía de la mejor interfaz de audio. Si tus sesiones');
swap('Apollo X16 vs RME Fireface UFX III: DSP vs ruteo', 'Apollo X16 vs RME Fireface UFX III: DSP vs encaminamiento');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
