const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const signal = JSON.parse(fs.readFileSync(B + 'temp/rank_signal.json', 'utf8'));

const done = new Set(Object.keys(overrides));
const pend = signal.filter(s => !done.has(s.id));

console.log('Guias pendientes: ' + pend.length + '\n');
pend.sort((a, b) => a.n - b.n).forEach(s => {
  console.log('  ' + String(s.n).padStart(2) + '  ' + s.id);
});
