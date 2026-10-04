const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const T = {
  'Woofer': 'Graves', 'Tweeter': 'Agudos', 'Driver': 'Transductor',
  'MIDI I/O': 'MIDI E/S', 'Preamps': 'Previos', 'Tracks': 'Pistas',
  'Best For': 'Ideal para', 'Type': 'Tipo', 'Inputs / Outputs': 'Entradas / Salidas',
  'Sample Rate': 'Frecuencia de muestreo', 'Bit Depth': 'Profundidad de bits',
  'Connectivity': 'Conectividad', 'Special Features': 'Características especiales',
  'Phantom Power': 'Alimentación phantom', 'Timecode': 'Código de tiempo',
  'Crossover': 'Frecuencia de corte', 'Audio I/O': 'E/S de audio'
};
let n = 0;
function fixRow(r) {
  if (r.label && T[r.label] && r.label_es === r.label) { r.label_es = T[r.label]; n++; }
}
G.forEach(g => {
  if (g.productTable) (g.productTable.rows || []).forEach(fixRow);
  if (g.comparison) (g.comparison.rows || []).forEach(fixRow);
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('etiquetas traducidas:', n);