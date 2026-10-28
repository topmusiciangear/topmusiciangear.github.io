const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const needles = [
  'cejuela de 50.8 mm',
  'Cejuela más estrecha de 1 7/8" no es la clásica de 52 mm',
  'Cabida dinámica limitada',
  'Cejuela ancha puede resultar voluminosa para manos pequeñas',
  'Cejuela ancha puede resultar voluminosa',
  'la pastilla entrega señal limpia directa a la PA',
  'hacen cómodo el alcance para edades 7-11',
  'la clásica de iniciación que se quita las fricciones de en medio',
  'El acabado satinado se siente rápido',
  'El acabado mate se siente rápido',
  'La construcción es consistente y sabes lo que compras en cualquier tienda.',
  'at under £150 it\'s the most reliable entry point',
  'por menos de 150 £ es el punto de entrada más fiable',
  'Not for learning. Cutaway and electronics add cost and complexity.',
  'Best classical guitars for beginners with nylon strings. Yamaha C40II, Cordoba C5 and more.',
  'If you want one guitar to start and grow with, the Yamaha C40II is still the student standard.',
  'Si quieres una guitarra para empezar y crecer, la Yamaha C40II sigue siendo el estándar de estudiante.'
];
for (const n of needles) console.log((raw.split(n).length - 1) + ' | ' + n);
const arr = JSON.parse(raw);
const p = arr.find(x => x.id === 1064);
console.log('\n1064 price:', p && p.price);
