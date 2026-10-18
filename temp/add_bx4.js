const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(ruta, 'utf8'));

if (products.some(p => /^M-Audio BX4$/i.test(p.title))) {
  console.log('ya existe: ' + products.find(p => /^M-Audio BX4$/i.test(p.title)).id);
  process.exit(0);
}

const siguiente = Math.max(...products.map(p => p.id)) + 1;

const g4mDestino = 'https://www.gear4music.com/Recording-and-Computers/M-Audio-BX4-Studio-Monitor-Pair/3M5T';
const g4mAwin = 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(g4mDestino);

const nuevo = {
  id: siguiente,
  title: 'M-Audio BX4',
  title_es: 'M-Audio BX4',
  brand: 'M-Audio',
  category: 'monitors',
  price: 149,
  rating: 4.6,
  reviews: 83,
  badge: 'recommended',
  desc: 'A 4.5-inch Black Kevlar woofer and 1-inch natural silk dome covering 69 Hz to 22 kHz, on 120W of peak power (2 x 25W RMS per pair), with a computer-optimised tweeter waveguide for imaging and enhanced rear ports for low-end extension. The rear panel carries High-EQ and Low-EQ trim plus a left/right active-speaker switch, so you can put the volume control on the side that suits you. One active speaker and one passive, cabled together with a standard 3.5mm lead. Foam feet are in the box.',
  desc_es: 'Woofer de 4,5 pulgadas de Kevlar negro y cúpula de seda natural de 1 pulgada que cubren de 69 Hz a 22 kHz, con 120 W de potencia pico (2 x 25 W RMS por pareja), guía de onda del tweeter optimizada por ordenador para la imagen y puertos traseros mejorados para extender el grave. El panel trasero lleva ajuste de agudos y graves, además de un conmutador para elegir en qué lado va la caja activa, así que puedes poner el control de volumen donde te venga bien. Una caja activa y otra pasiva, unidas por un cable estándar de 3,5 mm. Los pies de espuma vienen en la caja.',
  img: '',
  stores: {
    gear4music: g4mAwin,
    amazon: 'https://www.amazon.com/dp/B08KXTJX16?tag=topmusicg-20'
  },
  unit: 'pair',
  unit_es: 'par'
};

products.push(nuevo);
fs.writeFileSync(ruta, JSON.stringify(products, null, 2), 'utf8');

console.log('creada ficha id ' + siguiente + ' | M-Audio BX4');
console.log('  precio: $149 (US) | \u00A3100 en Gear4Music, el par  -> por debajo de $150 en ambas regiones');
console.log('  unidad: ' + nuevo.unit + ' / ' + nuevo.unit_es);
console.log('  tiendas: ' + Object.keys(nuevo.stores).join(', '));
console.log('  specs: m-audio.com/monitors-headphones/bx4.html');
console.log('  foto: PENDIENTE');
