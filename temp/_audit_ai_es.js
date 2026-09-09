const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const terms = ['caballo de batalla', 'la máquina de', 'a prueba de balas', 'el santo grial', 'todoterreno', 'sin igual', 'no tiene rival', 'arma definitiva', 'la bestia', 'bestia de', 'monstruo de', 'nivel profesional', 'eleva tu', 'desbloquea', 'imprescindible', 'obligatorio', 'benchmark', 'sin complicaciones', 'sin esfuerzo', 'fluido', 'un básico', 'el rey', 'estándar de la industria', 'a otro nivel', 'increíble', 'impresionante', 'fantástico', 'gemelo digital', 'lo que realmente importa', 'no solo', 'ya sea', 'sin lugar a dudas', 'definitivamente', 'sin duda', 'depende de', 'al final', 'en última instancia', 'hágalo', 'hazlo', 'encontrar el equilibrio', 'el equilibrio perfecto', 'el término medio'];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// collect all ES values (keys ending in _es) recursively
function walk(obj, path, out) {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') { out.push({ v: obj, p: path }); return; }
  if (Array.isArray(obj)) obj.forEach(function (x, i) { walk(x, path + '[' + i + ']', out); });
  else Object.keys(obj).forEach(function (k) { walk(obj[k], path + '.' + k, out); });
}

const esvals = [];
g.forEach(function (gi, giIdx) {
  walk(gi, 'g[' + giIdx + ']', esvals);
});

const results = {};
esvals.forEach(function ({ v, p }) {
  terms.forEach(function (tm) {
    const re = new RegExp(esc(tm), 'gi');
    let m;
    while ((m = re.exec(v)) !== null) {
      if (!results[tm]) results[tm] = [];
      const start = Math.max(0, m.index - 60);
      const snippet = v.slice(start, m.index + tm.length + 80).replace(/\n/g, ' ');
      results[tm].push({ p, snippet, ctx: v.slice(0, 150) });
    }
  });
});

Object.keys(results).forEach(function (tm) {
  console.log('\n=== ' + tm + ' (' + results[tm].length + ') ===');
  results[tm].slice(0, 4).forEach(function (r) {
    console.log('  [' + r.p + ']');
    console.log('  ...' + r.snippet + '...');
  });
});