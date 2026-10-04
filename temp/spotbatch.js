const fs = require('fs');
const checks = [
  ['guides/best-samplers-drum-computers.html', '£799'],
  ['guides/best-amp-modelers.html', '€599'],
  ['guides/best-amp-modelers.html', '1149987'],
  ['guides/best-amp-modelers.html', '1320044']
];
checks.forEach(([f, s]) => {
  const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/' + f, 'utf8');
  console.log(f.split('/')[1], '|', s, ':', h.includes(s) ? 'OK' : 'MISSING');
});