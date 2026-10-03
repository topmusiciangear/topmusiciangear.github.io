const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = P.find(x => x.id === 411);
p.desc = '22-channel ultra-compact digital mixer with 96 kHz sampling, 16 D-PRE preamps, 9-inch multi-touch screen and 18x18 USB interface. (No Dante — that is the DM3 model.)';
p.desc_es = 'Mezcladora digital ultracompacta de 22 canales con muestreo de 96 kHz, 16 preamplificadores D-PRE, pantalla multi-touch de 9 pulgadas e interfaz USB 18x18. (Sin Dante — ese es el modelo DM3.)';
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('done');