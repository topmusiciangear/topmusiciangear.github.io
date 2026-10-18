const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(ruta, 'utf8'));

if (products.some(p => /Eris 3\.5/i.test(p.title))) {
  console.log('ya existe una ficha Eris 3.5: ' + products.find(p => /Eris 3\.5/i.test(p.title)).id);
  process.exit(0);
}

const usados = products.map(p => p.id);
const siguiente = Math.max(...usados) + 1;

// id de Campaya (awinmid=1117) para Gear4music
const g4mDestino = 'https://www.gear4music.com/Recording-and-Computers/PreSonus-Eris-35-2nd-Gen-Studio-Monitors-Pair-Black/5S7N';
const g4mAwin = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(g4mDestino);

const nuevo = {
  id: siguiente,
  title: 'PreSonus Eris 3.5 2nd Gen',
  title_es: 'PreSonus Eris 3.5 2nd Gen',
  brand: 'PreSonus',
  category: 'monitors',
  price: 99.99,
  rating: 4.9,
  reviews: 10,
  badge: 'recommended',
  desc: 'A 3.5-inch woven glass-fibre composite woofer and 1-inch silk dome on 50W of Class AB amplification (25W per side), with a crossover at 2.8 kHz and a rear-firing reflex port. The rear panel carries the two controls that matter in a real room: High Frequency plus or minus 6 dB around 10 kHz and Low Frequency plus or minus 6 dB around 100 Hz, both continuously variable. One active speaker plus one passive, wired together, so you get balanced TRS, unbalanced RCA and a front Aux input for your phone.',
  desc_es: 'Woofer de 3,5 pulgadas de fibra de vidrio trenzada y cúpula de seda de 1 pulgada, con 50 W de amplificación Clase AB (25 W por lado), cruce en 2,8 kHz y puerto de graves por detrás. El panel trasero lleva los dos controles que de verdad importan en una sala real: agudos de -6 a +6 dB alrededor de 10 kHz y graves de -6 a +6 dB alrededor de 100 Hz, ambos continuos. Una caja activa y otra pasiva conectadas por cable, con entradas TRS balanceadas, RCA no balanceadas y entrada Aux frontal para el móvil.',
  img: '',
  stores: {
    gear4music: g4mAwin,
    amazon: 'https://www.amazon.com/dp/B0C5J2Y8NP?tag=topmusicg-20'
  },
  unit: 'pair',
  unit_es: 'par'
};

products.push(nuevo);
fs.writeFileSync(ruta, JSON.stringify(products, null, 2), 'utf8');

console.log('creada ficha id ' + siguiente);
console.log('  precio: $' + nuevo.price + '  (oficial presonus.com; en Gear4music ' + '\u00A3' + '81.50 el par)');
console.log('  unidad: ' + nuevo.unit + ' / ' + nuevo.unit_es);
console.log('  tiendas: ' + Object.keys(nuevo.stores).join(', '));
console.log('  foto: PENDIENTE (me la pasas)');
console.log('  total productos: ' + products.length);
