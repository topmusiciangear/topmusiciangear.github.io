// 1) Anadir PreSonus Eris Studio 5 (id 684) al catalogo
// 2) Anadir su entrada en TEST_SHOP_BTN con los 4 precios verificados
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

/* ═══ 1) products.json ═══ */
const PF = BASE + 'data/products.json';
const arr = JSON.parse(fs.readFileSync(PF, 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

if (list.some(p => /Eris Studio 5/i.test(p.title))) {
  console.log('products.json: ya existe, no se duplica');
} else {
  const p = {
    id: 684,
    title: 'PreSonus Eris Studio 5',
    title_es: 'PreSonus Eris Studio 5',
    brand: 'PreSonus',
    category: 'monitors',
    price: 149.99,
    rating: 4.4,
    reviews: 137,
    badge: 'recommended',
    desc: '5.25-inch woven composite woofer and 1-inch ultra-low-mass silk dome on 80W of Class AB bi-amplification. The EBM waveguide gives 120 degrees of horizontal and a narrow 60 degrees of vertical dispersion, so desk reflections drop out of the picture, and the front port reaches 48 Hz. Acoustic Space and Low Cut controls tune the response to the desk it sits on.',
    desc_es: 'Woofer de 5.25 pulgadas de compuesto trenzado y cúpula de seda ultraligera de 1 pulgada, con 80 W en Clase AB bi-amplificados. La guía de onda EBM da 120 grados de dispersión horizontal y solo 60 verticales, así que las reflexiones del escritorio desaparecen de la ecuación, y el puerto frontal baja hasta 48 Hz. Los controles Acoustic Space y Low Cut ajustan la respuesta al escritorio donde lo pones.',
    img: 'https://r2.gear4music.com/media/98/986627/1200/preview_1.jpg',
    stores: {
      gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent('https://www.gear4music.com/Recording-and-Computers/PreSonus-Eris-Studio-5/5S8A'),
      amazon: 'https://www.amazon.com/dp/B0C88X4VB4',
      andertons: 'https://www.andertons.co.uk/presonus-eris-studio-5-in-black/',
      musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent('https://www.musicstore.com/en_OE/EUR/Presonus-Eris-Studio-5/art-REC0016445-000')
    },
    unit: 'each',
    unit_es: 'cada uno'
  };
  list.push(p);
  fs.writeFileSync(PF, JSON.stringify(Array.isArray(arr) ? list : arr, null, 2) + '\n', 'utf8');
  console.log('products.json: id 684 creado');
  console.log('  tiendas: ' + Object.keys(p.stores).join(', '));
  console.log('  imagen : ' + p.img);
  console.log('  precio : $' + p.price + ' (Amazon $149.99)');
}

/* ═══ 2) TEST_SHOP_BTN ═══ */
const BF = BASE + 'build-guides.js';
let s = fs.readFileSync(BF, 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const finBloque = s.indexOf('\n};', ini);
let bloque = s.slice(ini, finBloque);

if (/(?:^|\n)\s*684:\s*\{/.test(bloque)) {
  console.log('build-guides.js: la entrada 684 ya existe');
} else {
  const linea = ' 684: { prices: { amazon: "$149.99", gear4music: "£117.00", andertons: "£105.00", musicstore: "€139.00" } }';
  bloque = bloque + '\n' + linea;
  s = s.slice(0, ini) + bloque + s.slice(finBloque);
  fs.writeFileSync(BF, s, 'utf8');
  console.log('build-guides.js: entrada 684 anadida con 4 precios');
  console.log('  ' + linea.trim());
}

console.log('\nmojibake products.json: ' + (fs.readFileSync(PF, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('mojibake build-guides.js: ' + (fs.readFileSync(BF, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
console.log('sintaxis: ' + (new Function(s), 'OK'));

// control
const arr2 = JSON.parse(fs.readFileSync(PF, 'utf8'));
const l2 = Array.isArray(arr2) ? arr2 : arr2.products;
console.log('\nproductos en el catalogo: ' + l2.length);
console.log('id maximo: ' + Math.max(...l2.map(x => x.id)));
const p684 = l2.find(x => x.id === 684);
console.log('\n684: ' + (p684 ? p684.title + '  $' + p684.price + '  ' + Object.keys(p684.stores).length + ' tiendas' : 'NO CREADO'));
