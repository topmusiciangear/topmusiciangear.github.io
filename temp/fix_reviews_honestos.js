const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let raw = fs.readFileSync(P, 'utf8');
const fixes = [
  ['Reviews honestos de los mejores afinadores para bajo y guitarra', 'Reseñas honestas de los mejores afinadores para bajo y guitarra']
];
fixes.forEach(function (f) {
  if (raw.indexOf(f[0]) >= 0) {
    const n = raw.split(f[0]).length - 1;
    raw = raw.split(f[0]).join(f[1]);
    console.log('OK x' + n + ':', f[1]);
  } else {
    console.log('SIN MATCH:', f[0]);
  }
});
fs.writeFileSync(P, raw, 'utf8');
