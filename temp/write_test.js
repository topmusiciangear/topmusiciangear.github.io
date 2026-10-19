const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = B + 'data/products.json';

const products = JSON.parse(fs.readFileSync(F, 'utf8'));
const antes = products.find(p => p.title === 'Strymon BigSky MX').score;
products.find(p => p.title === 'Strymon BigSky MX').score = 9.6;
const salida = JSON.stringify(products, null, 2);

console.log('bytes a escribir: ' + Buffer.byteLength(salida));
try {
  fs.writeFileSync(F, salida, 'utf8');
  console.log('writeFileSync OK');
} catch (e) {
  console.log('writeFileSync FALLO: ' + e.message);
}

const st = fs.statSync(F);
console.log('mtime tras escribir: ' + st.mtime.toISOString() + '  size=' + st.size);

const releido = JSON.parse(fs.readFileSync(F, 'utf8'));
console.log('antes=' + antes + '  despues=' + releido.find(p => p.title === 'Strymon BigSky MX').score);
