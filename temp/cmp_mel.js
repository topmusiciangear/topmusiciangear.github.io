const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['guides/repitch-vs-melodyne.html', 'guides/repitch-vs-melodyne_es.html'].forEach(f => {
  const h = fs.readFileSync(B + f, 'utf8');
  const rows = (h.match(/<tr>/g) || []).length;
  const ok = ['Formant', 'MIDI', 'Multi-Track', 'SynchroLink'].every(k => h.includes(k));
  console.log(f + ': tr=' + rows + ' filas-nuevas=' + (ok ? 'OK' : 'FALTA'));
});
