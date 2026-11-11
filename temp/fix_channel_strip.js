const fs = require('fs');
const G_PATH = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let raw = fs.readFileSync(G_PATH, 'utf8');
const before = raw;
raw = raw.split('Probamos los mejores plugins de channel strip con emulación analógica con análisis en mano, especificaciones y precios reales para ayudarte a elegir la opción adecuada.')
  .join('Probamos los mejores plugins de channel strip con análisis en mano, especificaciones y precios reales para ayudarte a elegir la opción adecuada.');
if (raw !== before) console.log('OK acortado');
else console.log('SIN MATCH');
fs.writeFileSync(G_PATH, raw, 'utf8');
