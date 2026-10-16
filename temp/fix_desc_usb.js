const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const s = g.find(x => x.id === 'usb-mics');
console.log('antes (' + s.description_es.length + '): ' + s.description_es);
s.description_es = 'Mejores micrófonos USB para streaming y podcast: opciones dinámicas y de condensador desde $70 hasta $299, con especificaciones, precios y enlaces.';
console.log('ahora (' + s.description_es.length + '): ' + s.description_es);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
