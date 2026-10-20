const fs = require('fs');
const files = [
  'guides/active-vs-passive-pa_es.html',
  'guides/acoustic-guitars-guide_es.html',
  'guides/budget-mics_es.html',
  'guides/best-pa-speakers.html',
  'guides/studio-furniture_es.html'
];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const i = h.indexOf('<div class="verdict-text">');
  const s = h.slice(i, i + 1800);
  console.log('=== ' + f);
  console.log(s.split('<p>').slice(0, 6).join('\n<p>').slice(0, 1200));
  console.log('');
}
