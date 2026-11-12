// Localiza en qué campos JSON vive cada cadena (para resolver colisiones del fixer)
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const strings = [
  'Audio-Technica AT2020 vs AKG P120: Condensador barato',
  '¿Cómo evito un Si grave flojo?',
  'Mejores mezcladores Digitales de rack con control tablet'
];
for (const s of strings) {
  const needle = '"' + JSON.stringify(s).slice(1, -1) + '"';
  const spots = [];
  let idx = -1;
  while ((idx = raw.indexOf(needle, idx + 1)) >= 0) {
    const before = raw.slice(Math.max(0, idx - 60), idx);
    const m = before.match(/"([A-Za-z_0-9]+)":\s*$/);
    spots.push(m ? m[1] : '(?' + JSON.stringify(before.slice(-30)) + ')');
  }
  console.log(s.slice(0, 45) + '  =>  ' + spots.join(', '));
}
