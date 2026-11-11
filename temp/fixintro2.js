const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  'Estas son en las que yo creo y en las que confían algunos ingenieros profesionales:',
  'Estos son en los que yo creo y en los que confían algunos ingenieros profesionales:'
);
fs.writeFileSync(p, s);
console.log('done');
