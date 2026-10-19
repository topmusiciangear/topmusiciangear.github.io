// Vuelca la senal de ranking de las guias indicadas (por indice o id),
// en un formato compacto para poder puntuarlas a mano.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const signal = JSON.parse(fs.readFileSync(B + 'temp/rank_signal.json', 'utf8'));

const pend = signal.filter(s => !s.reviewed);
const args = process.argv.slice(2);
const picks = args.length
  ? args.map(a => (/^\d+$/.test(a) ? pend[Number(a)] : signal.find(s => s.id === a)))
  : pend.slice(0, 5);

picks.filter(Boolean).forEach(s => {
  console.log('\n' + '='.repeat(70));
  console.log('[' + s.id + ']  ' + s.title + '   (' + s.n + ' productos)');
  console.log('='.repeat(70));
  if (s.verdict) console.log('\nVEREDICTO:\n' + s.verdict);
  if (s.conclusion) console.log('\nCONCLUSION:\n' + s.conclusion);
  console.log('\nPRODUCTOS (score actual | precio):');
  s.products.forEach((p, i) => console.log('  ' + (i + 1) + '. ' + p.name + '  [' + p.score + ' | ' + p.price + ']'));
});
