const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Verificar si ya existe
const existe = products.find(p => p.title && /rodecaster.*pro.*ii/i.test(p.title));
if (existe) {
  console.log('Ya existe: ' + existe.title + ' con score ' + existe.score);
  if (existe.score < 9.0) {
    existe.score = 9.4;
    console.log('  -> score actualizado a 9.4');
  }
} else {
  // Crear el producto
  const nuevo = {
    id: 241,
    title: 'RØDE RØDECaster Pro II',
    title_es: 'RØDE RØDECaster Pro II',
    brand: 'RØDE',
    category: 'streaming',
    price: 699,
    rating: 4.8,
    reviews: 2500,
    badge: 'flagship',
    desc: 'All-in-one podcast production console with 4 Neutrik combo inputs, 76dB Revolution preamps, APHEX processing, 8 SMART pads, dual USB-C, 5.5-inch touchscreen, and multitrack recording to microSD or USB.',
    desc_es: 'Consola de producción de podcast todo en uno con 4 entradas combo Neutrik, previos Revolution de 76dB, procesamiento APHEX, 8 pads SMART, doble USB-C, pantalla táctil de 5.5 pulgadas y grabación multitrack a microSD o USB.',
    img: 'https://r2.gear4music.com/media/241/241000/1200/preview.jpg',
    stores: {},
    score: 9.4
  };
  products.push(nuevo);
  console.log('Producto creado: RØDE RØDECaster Pro II con score 9.4');
}

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Total productos: ' + products.length);