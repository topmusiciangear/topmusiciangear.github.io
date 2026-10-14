const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };

// ================= CATALOGO =================
const pj = BASE + 'data/products.json';
const PJ = JSON.parse(fs.readFileSync(pj, 'utf8'));
const arr = Array.isArray(PJ) ? PJ : PJ.products;

// --- 467 BB434: incorporar el puente diagonal en la ficha ---
const p467 = arr.find(x => x.id === 467);
if (!p467) die('467 no existe');
p467.price = 599;
p467.desc = "The Yamaha BB434 is the passive studio workhorse of the BB 400 series. Solid alder body, 5-piece maple/mahogany neck, 6-bolt miter joint and YGD Custom V5 Alnico V pickups (split single-coil neck plus single-coil bridge) for the definitive P/J voice. Its Vintage Plus Light bridge offers convertible stringing, including Diagonal Body Thru Stringing at 45 degrees for less string stress and faster sustain.";
p467.desc_es = "El Yamaha BB434 es la bestia pasiva de estudio de la serie BB 400. Cuerpo sólido de aliso, mástil de 5 piezas arce/caoba, unión de 6 tornillos y pastillas YGD Custom V5 Alnico V (split single-coil en el mástil más single-coil en el puente) para la voz P/J definitiva. Su puente Vintage Plus Light admite cordaje convertible, incluido el Diagonal Body Thru Stringing a 45 grados para menos tensión en las cuerdas y más sustain.";

// --- 683 G&L Tribute L-2000 (nuevo) ---
if (arr.some(x => x.id === 683)) die('683 ya existe');
arr.push({
  id: 683, title: 'G&L Tribute L-2000', title_es: 'G&L Tribute L-2000', brand: 'G&L',
  category: 'bass', price: 0,
  desc: "Leo Fender's 1980 design with G&L Magnetic Field Design humbuckers built in Fullerton, California, and the Tri-Tone preamp: three mini toggles for pickup selection, series/parallel routing and passive/active operation. Ash top over poplar, hard-rock maple C neck, 21 medium jumbo frets, Saddle-Lock bridge.",
  desc_es: "El diseño de Leo Fender de 1980 con humbuckers G&L Magnetic Field Design construidos en Fullerton, California, y el previo Tri-Tone: tres miniswitches para selección de pastilla, ruteo serie/paralelo y operación pasiva/activa. Tapa de fresno sobre álamo, mástil en C de hard rock maple, 21 trastes medium jumbo, puente Saddle-Lock.",
  img: 'https://media.musicshop360.com/THUMB_10989/IMG_3617.jpg',
  image: 'https://media.musicshop360.com/THUMB_10989/IMG_3617.jpg',
  stores: {}, excludeStores: ['reverb']
});
fs.writeFileSync(pj, JSON.stringify(PJ, null, 2));
console.log('catalogo: 467 desc actualizado + alta 683 G&L Tribute L-2000 (precio pendiente)');

// ================= TEST_SHOP_BTN =================
const bj = BASE + 'build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
if (/\n  683: \{/.test(src)) die('TEST 683 ya existe');
const ins = '\n  683: {\n    prices: {\n    },\n    urls: {\n    }\n  },';
const lastId = Math.max(...[...src.matchAll(/\n  (\d+): \{/g)].map(m => +m[1]));
const mLast = new RegExp('\\n  ' + lastId + ': \\{');
const iLast = src.search(mLast);
const mNext = /\n  \d+: \{/.exec(src.slice(iLast + 2));
src = src.slice(0, iLast + 2 + mNext.index) + ins + src.slice(iLast + 2 + mNext.index);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); } catch (e) { die('build roto: ' + e.message); }
console.log('TEST 683 creado (vacio, esperando precio/links del usuario)');
console.log('STEP_CAT OK');