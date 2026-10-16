const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'k371-vs-mdr7506');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('¿Qué es mejor — precisión harman o legado de estudio probado?', '¿Qué es mejor: precisión Harman o legado de estudio probado?');
swap('Los AKG K371 y Sony MDR-7506 dominan el mercado de auriculares cerrados',
  'Los AKG K371 y Sony MDR-7506 dominan el mercado de auriculares cerrados.');
swap('con una extensión grave profunda que se mantiene controlada', 'con una extensión de graves profunda que se mantiene controlada');
swap('Cables desmontables, copas plegables y funda incluida hacen cómodo ir al estudio o desplazarse',
  'Cables desmontables, copas plegables y funda incluida facilitan ir al estudio o desplazarse');
swap('siguen siendo el auricular más ubicuo en transmisión, cine y grabación', 'siguen siendo el auricular más extendido en broadcast, cine y grabación');
swap('La calidad de construcción es de plástico utilitario, pero confiable', 'La calidad de construcción es de plástico utilitario, pero fiable');
swap('Los AKG K371 siguen la curva objetivo Harman científica para monitoreo preciso',
  'Los AKG K371 siguen la curva objetivo científica Harman para monitoreo preciso');
swap('los K371 son significativamente más cómodos para uso prolongado que las almohadillas poco profundas de los MDR-7506',
  'los K371 son significativamente más cómodos para uso prolongado que los MDR-7506 con sus almohadillas poco profundas');
swap('Para un home studio que mezcla música, elige los K371', 'Para un estudio casero que mezcla música, elige los K371');
swap('Para edición de video y podcasting', 'Para edición de vídeo y podcasting');
swap('Compara la K371 y la MDR-7506 con más auriculares', 'Compara el K371 y el MDR-7506 con más auriculares');
swap('La AKG es la opción moderna para todo; la Sony es el estándar probado', 'El K371 es la opción moderna para todo; el MDR-7506 es el estándar probado');
swap('>guía de los mejores auriculares de estudio</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio para Mezcla y Seguimiento</a>', '>Mejores auriculares de estudio: guía completa</a>');
swap('>Mejores Auriculares de estudio Económicos</a>', '>Mejores auriculares de estudio por menos de $150</a>');
swap('>ATH-M50x vs MDR-7506</a>', '>ATH-M50x vs MDR-7506: ¿mejores auriculares cerrados?</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
