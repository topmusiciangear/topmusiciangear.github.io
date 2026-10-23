const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let c = fs.readFileSync(path, 'utf8');
let obj = JSON.parse(c);
const g = obj.find(x => x.id === 'best-monitors');

const nuevosTitulos = {
  1: {
    heading: 'Kali Audio LP-6 V2: Boundary EQ para cualquier habitación',
    heading_es: 'Kali Audio LP-6 V2: Boundary EQ para cualquier habitación'
  },
  2: {
    heading: 'KRK Rokit 7 G5: Graves generosos para home studios',
    heading_es: 'KRK Rokit 7 G5: Graves generosos para home studios'
  },
  3: {
    heading: 'Yamaha HS8: El estándar honesto que traducen tus mezclas',
    heading_es: 'Yamaha HS8: El estándar honesto que traducen tus mezclas'
  },
  4: {
    heading: 'Adam Audio A7V: Detalle de cinta X-ART para microdetalle',
    heading_es: 'Adam Audio A7V: Detalle de cinta X-ART para microdetalle'
  }
};

Object.entries(nuevosTitulos).forEach(([idx, titulos]) => {
  if (g.sections[idx]) {
    g.sections[idx].heading = titulos.heading;
    g.sections[idx].heading_es = titulos.heading_es;
    console.log('Sección ' + idx + ': "' + titulos.heading_es + '"');
  }
});

fs.writeFileSync(path, JSON.stringify(obj, null, 2));
console.log('Títulos actualizados - ya no son plantilla');