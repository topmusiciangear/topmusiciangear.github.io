// Lista claves duplicadas en QF_ES_MAP (con línea) + total de entradas
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const lines = bg.split('\n');
const start = lines.findIndex(l => l.startsWith('var QF_ES_MAP'));
let end = -1;
for (let i = start; i < lines.length; i++) {
  if (lines[i].replace(/\r$/, '') === '};') { end = i; break; }
}
console.log('mapa: líneas ' + (start + 1) + '–' + (end + 1) + ' (' + (end - start - 1) + ' entradas)');
const seen = new Map();
const dups = [];
for (let i = start + 1; i < end; i++) {
  const m = lines[i].replace(/\r$/, '').match(/^  '(.+)': '(.*)',?$/);
  if (!m) { console.log('LÍNEA NO PARSEADA ' + (i + 1) + ': ' + JSON.stringify(lines[i].slice(0, 90))); continue; }
  const key = m[1];
  if (seen.has(key)) dups.push([key, seen.get(key) + 1, i + 1]);
  else seen.set(key, i + 1);
}
console.log('entradas parseadas: ' + seen.size + ' | claves: ' + seen.size + ' | duplicados: ' + dups.length);
dups.forEach(d => console.log('  DUP «' + d[0] + '» primera en L' + d[1] + ' duplicada en L' + d[2]));
