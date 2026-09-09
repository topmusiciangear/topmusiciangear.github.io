const fs = require('fs');
const orig = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const chunks = [1, 2, 3, 4, 5, 6].map(n => JSON.parse(fs.readFileSync('temp/_nat_chunk' + n + '.json', 'utf8')));
const byId = {};
chunks.forEach(a => a.forEach(g => { byId[g.id] = g; }));

const out = orig.map(g => (byId[g.id] ? byId[g.id] : g));
fs.writeFileSync('data/guides.json', JSON.stringify(out, null, 2) + '\n');
console.log('Merged. Total guides:', out.length);

const cliches = ['caballo de batalla', 'todoterreno', 'estándar de la industria', 'industry standard', 'sin esfuerzo', 'effortless', 'effortlessly', 'hassle-free', 'sin complicaciones', 'nivel profesional', 'pro-level', 'studio-grade', 'no tiene rival', 'unrivaled', 'unrivalled', 'unmatched', 'la bestia', 'bestia de', 'the beast', 'beast of', 'monstruo de', 'monster', 'increíble', 'increible', 'incredible', 'imprescindible', 'arma definitiva', 'ultimate weapon', 'a prueba de balas', 'bulletproof', 'el rey del presupuesto', 'king of the budget', 'desbloquea', 'unlock', 'unlocks', 'eleva tu', 'elevate your', 'a otro nivel', 'benchmark', 'workhorse', 'holy grail', 'santo grial', 'definitely', 'essential', 'sin igual', 'máquina de', 'machine of'];
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function count(o) {
  let n = 0;
  (function w(x) {
    if (typeof x === 'string') {
      cliches.forEach(c => { const m = x.match(new RegExp(esc(c), 'gi')); if (m) n += m.length; });
      return;
    }
    if (x && typeof x === 'object') Object.keys(x).forEach(k => w(x[k]));
  })(o);
  return n;
}
console.log('Cliché hits BEFORE:', count(orig), '-> AFTER:', count(out));