const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'pro-interfaces');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('RME ofrece una fiabilidad a prueba de todo y flexibilidad de enrutamiento',
  'RME ofrece una fiabilidad a prueba de todo y flexibilidad de encaminamiento.');
swap('Apollo para proceso UAD DSP; RME para fiabilidad a prueba de todo y flexibilidad de enrutamiento.',
  'Apollo para proceso UAD DSP; RME para fiabilidad a prueba de todo y flexibilidad de encaminamiento.');
swap('ofrece conversión de 167dB de rango dinámico con procesamiento', 'ofrece conversión de 167 dB de rango dinámico con procesamiento');
swap('conversión D/A de 135dB, supresión de jitter', 'conversión D/A de 135 dB, supresión de jitter');
swap('La conectividad Thunderbolt de dieciséis por veinte maneja', 'La conectividad Thunderbolt de 16x20 maneja');
swap('E/S extensa y flexibilidad de enrutamiento TotalMix FX.', 'E/S extensa y flexibilidad de encaminamiento TotalMix FX.');
swap('>Mejor Interfaz de Audio</a>', '>Mejores interfaces de audio por menos de $300</a>');
swap('>Mejor Interfaz de Audio para Grabación Casera</a>', '>Mejor interfaz de audio: guía completa para grabación casera</a>');
swap('>Mejores Interfaces de Audio Portátiles</a>', '>Mejores interfaces de audio portátiles: guía completa</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
