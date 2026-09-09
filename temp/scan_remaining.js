const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('temp/_nat_chunk6.json', 'utf8'));

function findAll(guides, patterns) {
  const results = [];
  function walk(obj, path) {
    if (typeof obj === 'string') {
      for (const pat of patterns) {
        let m; pat.lastIndex = 0;
        while ((m = pat.exec(obj)) !== null) {
          results.push({ path, match: m[0], ctx: obj.substring(Math.max(0, m.index - 80), m.index + m[0].length + 80) });
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, path + '[' + i + ']'));
    } else if (obj && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) walk(v, path + '.' + k);
    }
  }
  for (const g of guides) walk(g, g.id);
  return results;
}

const patterns = [
  /pro-level resonance/,
  /todoterreno/,
  /nivel profesional/,
  /sin complicaciones/,
  /industry standard/,
  /estándar de la industria/,
  /the industry benchmark/,
  /el benchmark/,
  /the benchmark\b/,
  /la referencia de la industria/,
  /benchmark for/,
  /incredible precision/,
  /incredible value/,
  /incredible/,
  /studio-grade/,
  /Premium studio-grade/,
  /premium studio-grade/,
  /la mejor opción todoterreno/,
  /el mejor combo todoterreno/,
  /sound design powerhouse/,
  /bestia del diseño/,
  /no tiene rival/,
  /máquina de diseño/,
  /máquina de batería/,
  /máquina de ritmos/
];

for (const r of findAll(guides, patterns)) {
  const line = '[' + r.path + '] "' + r.match + '":\n  ' + r.ctx.replace(/\n/g, ' ') + '\n';
  process.stdout.write(line + '\n');
}