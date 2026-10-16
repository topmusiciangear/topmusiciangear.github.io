const fs = require('fs');
const S = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-monitors-for-small-rooms'));
const pruebas = [
  'Trampas de graves de 4 pulgadas de grosor en tantas esquinas',
  'biamplificados a 70W',
  'biamplificados a 55W',
  'mejores auriculares de estudio'
];
pruebas.forEach(p => console.log((S.includes(p) ? 'SI ' : 'NO ') + p));
// ver cola sec2
const i = S.indexOf('auriculares de estudio');
console.log(JSON.stringify(S.slice(i - 100, i + 120)));
