const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('temp/_nat_chunk6.json', 'utf8'));

const phrases = [
  'máquina de', 'maquina de', 'bestia', 'potencia', 'poder ',
  'definitiva', 'definitivo', 'ultimate', 'the ultimate', 'premium',
  'workhorse', 'caballo', 'powerhouse', 'la bomba', 'tenebrosa',
  'asombroso', 'asombrosa', 'espectacular', 'impresionante'
];

for (const g of guides) {
  const all = [];
  (function walk(v, path) {
    if (typeof v === 'string') {
      for (const p of phrases) {
        let idx = v.indexOf(p);
        while (idx >= 0) {
          const start = Math.max(0, idx - 55);
          const end = Math.min(v.length, idx + p.length + 55);
          all.push(path + ' => [' + p + '] ...' + v.substring(start, end).replace(/\n/g, ' ') + '...');
          idx = v.indexOf(p, idx + 1);
        }
      }
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => walk(item, path + '[' + i + ']'));
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) walk(x, path + '.' + k);
    }
  })(g, g.id);
  if (all.length) {
    console.log('### ' + g.id.toUpperCase());
    all.forEach(x => console.log('  ' + x));
  }
}