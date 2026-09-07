const fs = require('fs');
const productsPath = './data/products.json';
const guidesPath = './data/guides.json';

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

const newProducts = [
  {
    id: 479,
    title: 'Focal Sub12 13" Professional Studio Subwoofer',
    title_es: 'Focal Sub12 Subwoofer de Estudio Profesional de 13"',
    brand: 'Focal',
    category: 'monitors',
    price: 2999,
    badge: 'premium',
    unit: 'each',
    unit_es: 'cada uno',
    desc: 'French reference subwoofer built around a handmade 13-inch (33 cm) ultra-high-excursion "W" composite sandwich cone, driven by a 600W RMS / 1000W peak BASH Class G amplifier. It reaches 28 Hz (±3 dB) with a 125 dB peak SPL, and the front-firing laminar port plus tuned internal bracing — borrowed from the Trio11 monitors — keep port turbulence and distortion near zero.',
    desc_es: 'Subwoofer de referencia francés construido en torno a un cono compuesto sandwich "W" de 13 pulgadas (33 cm) de ultra alta excursión, fabricado a mano, impulsado por un amplificador BASH Clase G de 600W RMS / 1000W de pico. Llega hasta 28 Hz (±3 dB) con 125 dB de SPL de pico, y el puerto laminar frontal y los refuerzos internos afinados — heredados de los monitores Trio11 — mantienen la turbulencia del puerto y la distorsión casi en cero.',
    img: 'https://dam.focal-naim.com/m/4d48a4a843f6882f/original/SUB12_34-jpg.jpg',
    stores: {
      zzounds: 'https://www.zzounds.com/item--FOLFOPROSUB12',
      andertons: 'https://www.andertons.co.uk/focal-sub-12-subwoofer/',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Focal-Sub-12/art-REC0016102-000',
      reverb: 'https://reverb.com/marketplace?query=Focal%20Sub12'
    },
    excludeStores: ['gear4music', 'amazon']
  },
  {
    id: 480,
    title: 'Genelec 7370A SAM 12" Smart Active Studio Subwoofer',
    title_es: 'Genelec 7370A SAM Subwoofer de Estudio Activo Inteligente de 12"',
    brand: 'Genelec',
    category: 'monitors',
    price: 4195,
    badge: 'premium',
    unit: 'each',
    unit_es: 'cada uno',
    desc: 'Finnish 12-inch (305 mm) smart subwoofer with 400W of Class D power reaching 19 Hz. Part of Genelec\'s SAM ecosystem, its built-in 7.1 distribute bass management and GLM AutoCal room correction adapt the low end to the room automatically — making it the reference choice for large commercial mixing rooms and Dolby Atmos post-production.',
    desc_es: 'Subwoofer inteligente finlandés de 12 pulgadas (305 mm) con 400W de potencia Clase D que llega hasta 19 Hz. Parte del ecosistema SAM de Genelec, su gestión distribuida de graves para 7.1 y la corrección de sala GLM AutoCal adaptan los graves a la sala automáticamente — la elección de referencia para grandes salas de mezcla comerciales y postproducción Dolby Atmos.',
    img: 'https://images.ctfassets.net/4zjnzn055a4v/2LBBVe8ED3d5XuEX7ItUyj/befa4466973563e03350f720cf85f0af/7370_main_image.jpg?w=800',
    stores: {
      andertons: 'https://www.andertons.co.uk/genelec-7370apm-active-studio-sub-woofer-w-dsp-single-unit/',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Genelec-7370-APM/art-REC0012693-000',
      reverb: 'https://reverb.com/marketplace?query=Genelec%207370A'
    },
    excludeStores: ['zzounds', 'amazon', 'gear4music']
  },
  {
    id: 481,
    title: 'Barefoot Sound MicroSub45 Dual-Force 8" Active Studio Subwoofer (Pair)',
    title_es: 'Barefoot Sound MicroSub45 Subwoofer Activo de Estudio Dual-Force de 8" (Par)',
    brand: 'Barefoot Sound',
    category: 'monitors',
    price: 5495,
    badge: 'premium',
    unit: 'pair',
    unit_es: 'par',
    desc: 'American reference subwoofer using Barefoot\'s patented Dual-Force technology: two opposing 8-inch drivers in a sealed 18-litre cabinet whose motors are mechanically locked, cancelling force at the source for zero cabinet vibration. 500W per cabinet (1000W total), extension to 25 Hz (-3 dB), and a fixed 80 Hz analogue high-pass that offloads bass from the MicroMain45 monitors.',
    desc_es: 'Subwoofer de referencia estadounidense que usa la tecnología patentada Dual-Force de Barefoot: dos drivers de 8 pulgadas opuestos en un gabinete sellado de 18 litros cuyos motores están bloqueados mecánicamente, cancelando la fuerza en el origen para cero vibración en la caja. 500W por gabinete (1000W en total), extensión hasta 25 Hz (-3 dB) y un paso alto analógico fijo de 80 Hz que descarga los graves de los monitores MicroMain45.',
    img: 'https://barefootsound.com/wp-content/uploads/2017/09/MicroSub45-hero.jpg',
    stores: {
      reverb: 'https://reverb.com/marketplace?query=Barefoot%20MicroSub45'
    },
    excludeStores: ['zzounds', 'amazon', 'gear4music', 'andertons', 'musicstore']
  }
];

newProducts.forEach((p) => {
  const idx = products.findIndex((x) => x.id === p.id);
  if (idx >= 0) products[idx] = p;
  else products.push(p);
});
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log('products.json updated. New count:', products.length);
console.log(
  'has 479:', products.some((x) => x.id === 479),
  '| has 480:', products.some((x) => x.id === 480),
  '| has 481:', products.some((x) => x.id === 481)
);
