const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'best-compact-mixers');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('PreSonus StudioLive SE 24R: mezcladora y caja de escenario en una', 'PreSonus StudioLive SE 24R: mezclador y caja de escenario en uno');
swap('Para racks IEM de varios músicos con presupuesto, comprueba tableta más router de repuesto antes de comprar.',
  'Para racks IEM de varios músicos con presupuesto, lleva tableta más router de repuesto antes de comprar.');
swap('FX Lexicon, compresión dbx y supresión de feedback.', 'FX Lexicon, compresión dbx y antiaceople.');
swap('su matriz de ruteo abierta asume que dominas el flujo', 'su matriz de encaminamiento abierta asume que dominas el flujo');
swap('la ranura opciónal Dante/Waves/MADI, su puerto USB de 32x32 y el sistema SQ-Drive soluciónan la grabación',
  'la ranura opcional Dante/Waves/MADI, su puerto USB de 32x32 y el sistema SQ-Drive solucionan la grabación');
swap('Los fly-sistemas e instalaciones ahorran el máximo espacio.', 'Los sistemas de gira e instalaciones ahorran el máximo espacio.');
swap('>Mejores Mezcladores Digitales</a>', '>Mejores mezcladores digitales: guía completa</a>');
swap('>Mejores Mezcladores de Sonido en Vivo</a>', '>Mejores mezcladores de sonido para bandas y eventos</a>');
swap('>Mejores Mezcladores Analógicos</a>', '>Mejores mesas de mezcla analógicas: control directo</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
