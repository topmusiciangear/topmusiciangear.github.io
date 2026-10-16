const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'hs8-vs-rokit-7');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('son los dos monitores de estudio más comentados en su rango de precio',
  'son los dos monitores de estudio más comentados en su rango de precio.');
swap('Ideales para home studios que buscan una precisión sin piedad', 'Ideales para estudios caseros que buscan una precisión sin piedad');
swap('Revisa el tamaño de la sala, la distancia a las paredes y contar con soportes o bases antes de comprarlos',
  'Revisa el tamaño de la sala, la distancia a las paredes y si cuentas con soportes o bases antes de comprarlos');
swap('llegan más profundo en graves (38Hz) que los KRK Rokit 7 G5 (43Hz)', 'llegan más profundo en graves (38 Hz) que los KRK Rokit 7 G5 (43 Hz)');
swap('El woofer de 8 pulgadas del HS8 llega más abajo (38Hz vs 43Hz)', 'El woofer de 8 pulgadas del HS8 llega más abajo (38 Hz vs 43 Hz)');
swap('pero el puerto trasero de los Rokit ofrece más flexibilidad de colocación', 'pero el puerto frontal de los Rokit ofrece más flexibilidad de colocación');
swap('El puerto trasero y el DSP EQ del Rokit te dan más flexibilidad de colocación', 'El puerto frontal y la EQ DSP del Rokit te dan más flexibilidad de colocación');
swap('los bass traps no son negociables para un monitoreo preciso', 'los bass traps son imprescindibles para un monitoreo preciso');
swap('Son implacables pero confiables', 'Son implacables pero fiables');
swap('Son más indulgentes y hacen que la producción sea divertida', 'Son más tolerantes y hacen que la producción sea divertida');
swap('Mezcla en los HS8, vibe en los Rokit', 'Mezcla en los HS8, crea en los Rokit');
swap('>guía de los mejores monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio</a>', '>Mejores monitores de estudio: guía completa para cada sala</a>');
swap('>Mejores Monitores de estudio Económicos</a>', '>Mejores monitores de estudio por menos de $500</a>');
swap('>Mejores Monitores de estudio para Salas Pequeñas</a>', '>Mejores monitores de estudio para salas pequeñas</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
