const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const maxId = Math.max(...products.map(p => p.id));
console.log('Max id actual: ' + maxId);

// Evitar duplicados
if (products.find(p => p.title === 'Audeze MM-500')) {
  console.log('Audeze MM-500 ya existe, no se duplica');
  process.exit(0);
}

const nuevo = {
  id: maxId + 1,
  title: 'Audeze MM-500',
  title_es: 'Audeze MM-500',
  brand: 'Audeze',
  category: 'headphones',
  price: 1699,
  rating: 4.7,
  reviews: 210,
  badge: 'premium',
  unit: 'each',
  unit_es: 'cada uno',
  desc: 'Open-back planar magnetic reference headphones co-designed with mix engineer Manny Marroquin. 90 mm Fluxor drivers, 5 Hz-50 kHz response, under 0.1% THD and a machined aluminium chassis at 495 g for long sessions.',
  desc_es: 'Auriculares abiertos de referencia con drivers planares magnéticos, diseñados con el ingeniero de mezcla Manny Marroquin. Drivers Fluxor de 90 mm, respuesta de 5 Hz a 50 kHz, menos del 0,1% de THD y un chasis de aluminio mecanizado de 495 g para sesiones largas.',
  img: '',
  stores: {
    gear4music: 'https://www.gear4music.com/PA-DJ-and-Lighting/Audeze-MM-500-Planar-Magnetic-Headphones/52EE',
    amazon: 'https://www.amazon.com/dp/B0B837YJSY',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Audeze-MM-500/art-REC0016368-000'
  }
};

products.push(nuevo);
fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Audeze MM-500 creado con id=' + nuevo.id);
console.log('Total productos: ' + products.length);
