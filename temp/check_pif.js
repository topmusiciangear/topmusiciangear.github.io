const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'portable-interfaces');
const checks = [
  ['SEC3', s.sections[3].content_es, 'La caja conviene a cantantes'],
  ['SEC4', s.sections[4].content_es, 'La concesión llega en el margen'],
  ['SEC5', s.sections[5].content_es, 'La SSL 2+ MKII traslada'],
  ['SEC7a', s.sections[7].content_es, 'La EVO 4 acorta ese baile'],
  ['SEC7b', s.sections[7].content_es, 'La concesión es el techo'],
];
checks.forEach(([label, text, expected]) => {
  console.log(label + ': ' + (text.includes(expected) ? 'OK' : 'FALLA') + ' | The: ' + (text.includes('The ') ? 'AÚN TIENE' : 'LIMPIO'));
});
