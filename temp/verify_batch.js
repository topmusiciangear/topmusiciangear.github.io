const fs = require('fs');
const base = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
for (const f of ['best-multi-effects-pedals.html', 'best-multi-effects-pedals_es.html', 'best-overdrive-distortion.html', 'best-overdrive-distortion_es.html']) {
  const t = fs.readFileSync(base + f, 'utf8');
  ['media/86/866574/1200', 'media/69/690954/1200', 'media/48/481497/1200', 'media/27/274347/1200', 'media/68/689230/1200',
   'MXR M104 Distortion+', '£445.00', '£635.00', '€777', '€1,585', '€599.00'].forEach(s => {
    if (t.includes(s)) console.log(f + ' OK :: ' + s.slice(0, 30));
  });
}
