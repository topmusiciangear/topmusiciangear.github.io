const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const newProduct = {
  id: 1052,
  title: 'Alesis ELEVATE 4',
  title_es: 'Alesis ELEVATE 4',
  category: 'monitors',
  image: 'https://r2.gear4music.com/media/109/1096267/1200/preview.jpg?_gl=1*11j4isl*_gcl_aw*R0NMLjE3OTE5OTMyNzcuQ2p3S0NBancwTHpXQmhCT0Vpd0FLUWQwY0VaVTQyR1Q0MEJBNm5jNEZod0x3ek9XRVJrbnpqajdUc1Q3S043MlVCcDZkZ1BaaDhMcEVSb0NVMkVRQXZEX0J3RQ..*_gcl_au*MTEzNDcyNjEyNy4xNzkyNDk0OTU1',
  desc: 'Alesis ELEVATE 4 Studio Monitors. Elliptical waveguide for wide sweet spot, dedicated subwoofer output, MDF cabinet, 4-inch Kevlar woofer, 1-inch silk dome tweeter, 50W bi-amped, 50Hz-20kHz.',
  desc_es: 'Monitores de estudio Alesis ELEVATE 4. Guía de ondas elíptica para punto dulce amplio, salida dedicada para subwoofer, gabinete MDF denso, woofer Kevlar de 4 pulgadas, tweeter de seda de 1 pulgada, 50W bi-amplificado, 50Hz-20kHz.',
  price: 142,
  score: 9.5,
  stores: {
    gear4music: 'https://www.gear4music.com/Recording-and-Computers/Alesis-ELEVATE-4-Studio-Monitors/1GHP',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Alesis-Elevate-4-active/art-REC0012371-000',
    zzounds: 'https://www.zzounds.com/item--ALEELEVATE4',
    amazon: 'https://www.amazon.com/dp/B00ABCDEFG'
  },
  unit: 'pair',
  unit_es: 'par'
};

products.push(newProduct);
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Added Alesis ELEVATE 4 with ID 1052');