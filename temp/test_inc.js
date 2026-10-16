const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'usb-mics');
let S = JSON.stringify(gg);
const pruebas = [
  'El <strong>sE Electronics NEOM USB</strong> va más allá con tres perillas',
  'tres perillas analógicas independientes',
  'Mezcla de Reproducción'
];
pruebas.forEach(p => console.log((S.includes(p) ? 'SI ' : 'NO ') + p.slice(0, 50)));
