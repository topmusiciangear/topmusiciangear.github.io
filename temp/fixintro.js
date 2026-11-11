const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
s = s.replace(
  'Pusimos a prueba las herramientas en las que confían los ingenieros profesionales: iZotope RX 12 Standard para reparación espectral, Waves Clarity Vx Pro para aislamiento de voz por IA en tiempo real, Sonible smart:deess para un de-essing inteligente, Acon Digital Restoration Suite 2 como una opción de limpieza económica y Zynaptiq Unveil para rescatar audios con demasiado eco.',
  'Estas son en las que yo creo y en las que confían algunos ingenieros profesionales: iZotope RX 12 Standard para reparación espectral, Waves Clarity Vx Pro para aislamiento de voz por IA en tiempo real, Sonible smart:deess para un de-essing inteligente, Acon Digital Restoration Suite 2 como una opción de limpieza económica y Zynaptiq Unveil para rescatar audios con demasiado eco.'
);
fs.writeFileSync(p, s);
console.log('done');
