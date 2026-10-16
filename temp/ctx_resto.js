const fs = require('fs');
const HITS = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/audit_es_v2.json', 'utf8'));
const RESTO = ['harsh', 'soundstage', 'sample rate', 'bit depth', 'noise floor', 'boomy/boxy', 'muddy', 'out of the box', 'entry-level', 'warranty', 'review', 'cheap', 'affordable', 'must-have', 'deal-breaker', 'deep dive', 'no-brainer', 'value for money', 'checkea', 'rankea', 'beast/killer/insane', 'checkout', 'pre-order', 'shipping', 'airy', 'scooped', 'crisp', 'silky'];
RESTO.forEach(pat => {
  const hs = HITS.filter(h => h.patron === pat);
  if (!hs.length) return;
  console.log('\n############ ' + pat + ' (' + hs.reduce((a, h) => a + h.n, 0) + ') ############');
  hs.slice(0, 8).forEach(h => {
    console.log('  [' + h.guia + ' :: ' + h.campo + ']');
    h.ejs.slice(0, 1).forEach(e => console.log('    ...' + e + '...'));
  });
});
