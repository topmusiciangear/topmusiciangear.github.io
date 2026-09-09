const g = require('../data/guides.json');
const cliches = ['caballo de batalla', 'todoterreno', 'estándar de la industria', 'industry standard', 'sin esfuerzo', 'effortless', 'effortlessly', 'hassle-free', 'sin complicaciones', 'nivel profesional', 'pro-level', 'studio-grade', 'no tiene rival', 'unrivaled', 'unrivalled', 'unmatched', 'la bestia', 'bestia de', 'the beast', 'beast of', 'monstruo de', 'monster', 'increíble', 'increible', 'incredible', 'imprescindible', 'arma definitiva', 'ultimate weapon', 'a prueba de balas', 'bulletproof', 'el rey del presupuesto', 'king of the budget', 'desbloquea', 'unlock', 'unlocks', 'eleva tu', 'elevate your', 'a otro nivel', 'benchmark', 'workhorse', 'holy grail', 'santo grial', 'definitely', 'essential', 'sin igual', 'máquina de', 'machine of'];
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
const t = {};
(function w(x) {
  if (typeof x === 'string') {
    cliches.forEach(function (c) {
      const m = x.match(new RegExp(esc(c), 'gi'));
      if (m) t[c] = (t[c] || 0) + m.length;
    });
    return;
  }
  if (x && typeof x === 'object') Object.keys(x).forEach(function (k) { w(x[k]); });
})(g);
Object.keys(t).sort(function (a, b) { return t[b] - t[a]; }).forEach(function (k) {
  console.log(t[k] + '\t' + k);
});