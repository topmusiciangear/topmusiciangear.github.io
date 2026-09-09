const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('temp/_nat_chunk6.json', 'utf8'));

const phrases = [
  'pro-level resonance',
  'todoterreno',
  'nivel profesional',
  'sin complicaciones',
  'industry standard',
  'estándar de la industria',
  'the industry benchmark',
  'the benchmark',
  'la referencia de la industria',
  'benchmark for',
  'incredible precision',
  'incredible value',
  'incredible',
  'studio-grade',
  'Premium studio-grade',
  'premium studio-grade',
  'la mejor opción todoterreno',
  'el mejor combo todoterreno',
  'sound design powerhouse',
  'bestia del diseño',
  'no tiene rival',
  'máquina de diseño',
  'workhorse',
  'caballo de batalla',
  'la bestia',
  'monstruo'
];

const results = [];
for (const g of guides) {
  const all = [];
  (function walk(v, path) {
    if (typeof v === 'string') {
      for (const p of phrases) {
        const idx = v.indexOf(p);
        if (idx >= 0) {
          const start = Math.max(0, idx - 70);
          const end = Math.min(v.length, idx + p.length + 70);
          all.push(path + ' => [' + p + '] ...' + v.substring(start, end).replace(/\n/g, ' ') + '...');
        }
      }
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => walk(item, path + '[' + i + ']'));
    } else if (v && typeof v === 'object') {
      for (const [k, x] of Object.entries(v)) walk(x, path + '.' + k);
    }
  })(g, g.id);
  if (all.length) {
    results.push('### ' + g.id.toUpperCase());
    all.forEach(x => results.push('  ' + x));
  }
}

fs.writeFileSync('temp/scan_results.txt', results.join('\n'), 'utf8');
console.log('done, hits:', results.length - 21);