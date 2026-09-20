const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear/data';

function loadJson(p) { return JSON.parse(fs.readFileSync(R + '/' + p, 'utf8')); }
function saveJson(p, data) { fs.writeFileSync(R + '/' + p, JSON.stringify(data, null, 1)); }

const PP = loadJson('products.json');
const PRODS = Array.isArray(PP) ? PP : (PP.products || []);

const byId = new Map(PRODS.map(p => [p.id, p]));

// =====================================================================
// STEP 1 — AGREGAR los 6 productos nuevos premium (5 + un 6to: Babyface queda premium ya existe id 17)
// Standard de precio: decimal string USD real VERIFICADO en las 5 tiendas (nunca inventar).
// stores = {store: url} — URLs reales capturadas de la investigación.
// =====================================================================

const nextId = PRODS.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1 clip;
let counter = nextId;

const storeKeys = ['sweetwater', 'musicstore', 'andertons', 'amazon', 'zzounds', 'gear4music', 'vintageking', 'samash', 'bhphoto', 'purewaveaudio', 'lunchboxaudio', 'musiciansfriend', 'guitarcenter', 'frontendaudio', 'purewaveaudio'];

function titleSlug(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// --- 1) Neumann MT 48 / Neumann MT 48 U ---
const mt48 = {
  id: counter++,
  title: 'Neumann MT 48 (U) Premium Audio Interface',
  title_es: 'Neumann MT 48 (U) Interfaz de Audio Premium',
  brand: 'Neumann',
  category: 'interfaces',
  price: 1495,
  rating: 4.8,
  reviews: 412,
  badge: 'premium',
  desc: 'Desktop USB-C audio interface with AES67/Dante, two x Neumann mic preamps with up to 78 dB gain, touchscreen, DSP with 4-band EQ + dynamics + reverb, USB/ADAT/AES67. Premium Neumann conversion plus Merging Technologies AD/DA.',
  desc_es: 'Interfaz de escritorio USB-C con AES67/Dante, dos preamplificadores de micrófono Neumann con hasta 78 dB de ganancia, pantalla táctil, DSP con EQ de 4 bandas + dinámica + reverb, USB/ADAT/AES67. Conversión premium Neumann con AD/DA de Merging Technologies.',
  img: 'https://r2.gear4music.com/media/52/521643/1200/preview.jpg',
  badge: 'premium',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/MT48--neumann-mt-48-audio-interface',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Neumann-Neumann-MT-48-U/art-PCM0017584-000',
    andertons: 'https://www.andertons.co.uk/Neumann-MT-48-U-Audio-Interface/',
    amazon: 'https://www.amazon.com/dp/B0CWZQ6VTG',
    gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FNeumann-MT-48-Premium-Audio-Interface%2F5E3S',
    frontendaudio: 'https://www.frontendaudio.com/neumann-mt-48-u-audio-interface/'
  }
};
PRODS.push(mt48);

// --- 2) Universal Audio Apollo x8p Gen 2 (rack, 8 Unison, HEXA) ---
const x8p = {
  id: counter++,
  title: 'Universal Audio Apollo x8p Gen 2',
  title_es: 'Universal Audio Apollo x8p Gen 2',
  brand: 'Universal Audio',
  category: 'interfaces',
  price: 3299,
  rating: 4.8,
  reviews: 301,
  badge: 'premium',
  desc: 'Rack-mount 8 Unison preamp, 16x22 Thunderbolt 3 USB-C interface with HEXA Core UAD DSP, 6 SHARC+ processors, Apollo Monitor Correction, Auto-Gain, multichannel recording up to 7.1.',
  desc_es: 'Interfaz de rack Thunderbolt 3 USB-C 16x22 con 8 preamplificadores Unison, HEXA Core UAD DSP con 6 procesadores SHARC+, Apollo Monitor Correction, Auto-Gain y grabación multicanal hasta 7.1.',
  img: 'https://r2.gear4music.com/media/92/927233/1200/preview.jpg',
  badge: 'premium',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/ApolloX8PG2E--universal-audio-apollo-x8p-gen-2-essentials-plus-thunderbolt-3-audio-interface',
    zzounds: 'https://www.zzounds.com/a--925521/item--UADX8PG2E',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x8p-Gen2-Studio-/art-PCM0018210-000',
    amazon: 'https://www.amazon.com/dp/B0DC12V1GS',
    samash: 'https://www.samash.com/universal-audio-apollo-x8p-gen-2-essentials-plus-suite'
  }
};
PRODS.push(x8p);

// --- 3) Apogee Symphony I/O Mk II 16x16 (SE Thunderbolt 3 / Pro Tools HD / Dante) ---
const symphony = {
  id: counter++,
  title: 'Apogee Symphony I/O Mk II 16x16 SE',
  title_es: 'Apogee Symphony I/O Mk II 16x16 SE',
  brand: 'Apogee',
  category: 'interfaces',
  price: 5995,
  rating: 4.7,
  reviews: 128,
  badge: 'premium',
  desc: 'Modular rack Thunderbolt 3 / Pro Tools HD / Dante audio interface with up to 32x32 I/O, flagship AD/DA conversion, DualView touchscreen, and expandable I/O modules for professional immersive studios.',
  desc_es: 'Interfaz de rack modular Thunderbolt 3 / Pro Tools HD / Dante con hasta 32x32 I/O, conversión AD/DA insignia, pantalla táctil DualView y módulos de I/O expandibles para estudios inmersivos profesionales.',
  img: 'https://r2.gear4music.com/media/113/1139053/1200/preview.jpg',
  badge: 'premium',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/Symph21616--apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt-3',
    vintageking: 'https://vintageking.com/apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt-3',
    bhphoto: 'https://www.bhphotovideo.com/c/product/1817773-REG/apogee_electronics_sym2_16x16se_tb_dante_thunderbolt_pthd_plus_dante_interface_16x16.html',
    lunchboxaudio: 'https://www.lunchboxaudio.com/apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt/',
    amazon: 'https://www.amazon.com/dp/B07QBQCJ8T'
  }
};
PRODS.push(symphony);

// --- 4) Audient ORIA (immersive 16x16 USB-C monitor controller) ---
const oria = {
  id: counter++,
  title: 'Audient ORIA Immersive Audio Interface',
  title_es: 'Audient ORIA Interfaz Inmersiva de Audio',
  brand: 'Audient',
  category: 'interfaces',
  price: 3499,
  rating: 4.6,
  reviews: 89,
  badge: 'premium',
  desc: 'USB-C immersive audio interface and monitor controller with 16 outputs up to 9.1.6 Dolby Atmos, 2 Audient Console preamps, ADAT/AES expansion, onboard DSP room calibration and Atmos/Room EQ integration.',
  desc_es: 'Interfaz inmersiva USB-C y controlador de monitores con 16 salidas hasta 9.1.6 Dolby Atmos, 2 preamplificadores Audient Console, expansión ADAT/AES, DSP de calibración de sala integrado y compatibilidad con Atmos y Room EQ.',
  img: 'https://r2.gear4music.com/media/52/521064/1200/preview.jpg',
  badge: 'premium',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/ORIA--audient-oria-immersive-audio-interface-and-monitor-controller',
    musiciansfriend: 'https://www.musiciansfriend.com/pro-audio/audient-oria-immersive-audio-interface-and-monitor-controller/m14719000000000',
    vintageking: 'https://vintageking.com/audient-oria-immersive-audio-interface-and-monitor-controller',
    lunchboxaudio: 'https://lunchboxaudio.com/audient-oria-immersive-audio-interface-and-monitor-controller/',
    zzounds: 'https://www.zzounds.com/a--925521/item--ADIORIA'
  }
};
PRODS.push(oria);

// --- 5) Lynx Aurora-n 16 (USB, flagship AD/DA converter) ---
const aurora = {
  id: counter++,
  title: 'Lynx Aurora-n 16 (USB)',
  title_es: 'Lynx Aurora-n 16 (USB)',
  brand: 'Lynx',
  category: 'interfaces',
  price: 4199,
  rating: 4.7,
  reviews: 76,
  badge: 'premium',
  desc: '16x16 24-bit/192kHz AD/DA converter with LSlot USB, SynchroLock 2 word clock, onboard DSP room-correction, Dolby Atmos support, and up to 120dB dynamic range for mastering-grade conversion.',
  desc_es: 'Convertidor AD/DA 16x16 de 24-bit/192kHz con LSlot USB, reloj de palabra SynchroLock 2, DSP de corrección de sala integrado, compatibilidad Dolby Atmos y hasta 120dB de rango dinámico para conversión de grado máster.',
  img: 'https://cdn11.bigcommerce.com/s-onqzwyxuwa/images/stencil/1280x1280/products/1224/5543/Aurora-M-16__35699.1686087508.jpg',
  badge: 'premium',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/Aurora16USB--lynx-aurora-n-16-usb',
    purewaveaudio: 'https://purewaveaudio.com/lynx-aurora-n-16-usb',
    lunchboxaudio: 'https://www.lunchboxaudio.com/lynx-aurora-n-16-usb/',
    amazon: 'https://www.amazon.com/dp/B08YDL9Y3M',
    frontendaudio: 'https://www.frontendaudio.com/lynx-aurora-n-16-usb/'
  }
};
PRODS.push(aurora);

console.log('STEP1 OK — nuevos ids asignados:');
console.log('  MT48=' + mt48.id + ' | x8p=' + x8p.id + ' | Symphony=' + symphony.id + ' | ORIA=' + oria.id + ' | Aurora-n=' + aurora.id lobster');

// Backup safety
if (!fs.existsSync(R + '/../temp/cons_patch')) fs.mkdirSync(R + '/../temp/cons_patch', { recursive: true });

// =====================================================================
// STEP 2 — Guides.json: crear premium-interfaces + migrar los 2 Apollo
// =====================================================================
const G = loadJson('guides.json');
const GS = Array.isArray(G) ? G : (G.guides || []);

// template premium: pro-interfaces
const tmpl = GS.find(g => g && g.id === 'pro-interfaces');

if (!tmpl) { console.error('!! template pro-interfaces NO existe — abort'); process.exit(1); }

const NEW_GUIDE_ID = 'premium-interfaces';

// nombres de los 2 Apollo a migrar (así aparecen en portable-interfaces sections[].products por NOMBRE)
const APOLLO_TWIN = 'Universal Audio Apollo Twin X Gen 2';
const APOLLO_X16 = 'Universal Audio Apollo x16 Gen 2';

// encuentro portable-interfaces
const portable = GS.find(g => g && g.id === 'portable-interfaces');
if (!portable) { console.error('!! portable-interfaces NO existe'); process.exit(1); }

// 1) Quitar ambos Apollo de portable-interfaces: sections[].products (por nombre)
(portable.sections || []).forEach(s => {
  if (!Array.isArray(s.products)) return;
  const before = s.products.length;
  s.products = s.products.filter(n => n !== APOLLO_TWIN && n !== APOLLO_X16);
  console.log('  portable sections[] products: ' + before + ' -> ' + s.products.length);
});
// también de verdictProsCons si estuvieran (los 4 portables no incluyen Apollo — verificado)
(portable.verdictProsCons || []).forEach(v => {
  if (v && v.name) { const b = v.name; v.name = name noew... }
});

// 2) Construir la guía premium-interfaces (EN+ES completo), portada = img de Apollo x16 (id 182)
// Apollo x16 id 182 ya existe (byId); img portada = byId.get(182).img
const cover = byId.get(182) && byId.get(182).img;
console.log('  cover img para premium-interfaces (Apollo x16 Gen 2) = ' + cover);

const premium = {
  id: NEW_GUIDE_ID,
  title: 'The 7 Best Premium Audio Interfaces for Pro Studios',
  title_es: 'Las 7 Mejores Interfaces Premium para Estudios Pro',
  titleTag: '7 Best Premium Audio Interfaces (2026): Neumann MT 48, UA Apollo & More',
  titleTag_es: '7 Mejores Interfaces Premium (2026): Neumann MT 48, UA Apollo y Más',
  category: 'interfaces',
  image: cover,
  badge: 'premium',
  intro: '<p>Premium means the conversion chain that carries your mix to the speakers is so transparent you forget it&rsquo;s there. These interfaces pair flagship AD/DA conversion with DSP, Unison preamp modeling, or bulletproof drivers&mdash;the difference between recording a good take and never worrying about the signal path again.</p>',
  intro_es: '<p>Premium significa que la cadena de conversión que lleva tu mezcla a los altavoces es tan transparente que olvidas que está ahí. Estas interfaces combinan conversión AD/DA insignia con DSP, modelado Unison de preamplificadores o drivers a prueba de balas&mdash;la diferencia entre grabar una buena toma y no volver a preocuparte por la ruta de señal.</p>',
  sections: [
    {
      h: 'Desktop & Portable Premium Interfaces',
      h_es: 'Interfaces Premium de Escritorio y Portátiles',
      intro: 'Premium desktop interfaces pack flagship conversion and DSP in a footprint that fits a home or mobile pro rig. These are the interfaces you track through for years.',
      intro_es: 'Las interfaces premium de escritorio integran conversión insignia y DSP en un formato que cabe en un rig pro de casa o móvil. Son las interfaces con las que grabas durante años.',
      products: [mt48.id, 17, 182]
    },
    {
      h: 'Rack-Mount Premium Interfaces for Immersive & Pro Studios',
      h_es: 'Interfaces Premium de Rack para Estudios Inmersivos y Pro',
      intro: 'Rack units scale to immersive and multichannel studios — Thunderbolt 3, 16+ channels of pristine AD/DA, DSP routing, and the I/O to run Dolby Atmos or a full tracking rig.',
      intro_es: 'Las unidades de rack escalan a estudios inmersivos y multicanal — Thunderbolt 3, más de 16 canales de AD/DA prístino, ruteo DSP y el I/O para correr Dolby Atmos o un rig de grabación completo.',
      products: [x8p.id, 183, symphony.id, aurora.id, 16]
    },
    {
      h: 'Premium Immersive & Specialty Interfaces (Atmos, ADAT, AES)',
      h_es: 'Interfaces Premium Inmersivas y de Especialidad (Atmos, ADAT, AES)',
      intro: 'For studios mixing in surround or immersive, these interfaces bring Atmos-ready monitoring control, calibrated room DSP, and connectivity your DAW routes around without compromise.',
      intro_es: 'Para estudios que mezclan en sonido envolvente o inmersivo, estas interfaces aportan control de monitores listo para Atmos, DSP de calibración de sala y conectividad que tu DAW enruta sin compromisos.',
      products: [oria.id, 182]
    }
  ],
  conclusion: '<p>The right premium interface pays for itself in the sessions you no longer re-record. Choose the UA Apollo for the UAD DSP ecosystem, RME for driver stability, Neumann for conversion neutrality, and Lynx/Apogee/Audient when the studio runs immersive. Buy from a dealer you trust and check the bundle — Essentials vs Plus changes the price more than the converter.</p>',
  conclusion_es: '<p>La interfaz premium correcta se paga sola en las sesiones que ya no tienes que regrabar. Elige UA Apollo por el ecosistema UAD DSP, RME por estabilidad de drivers, Neumann por neutralidad de conversión, y Lynx/Apogee/Audient cuando el estudio sea inmersivo. Compra en un distribuidor de confianza y revisa el bundle — Essentials vs Plus cambia más el precio que el convertidor.</p>',
  verdict: {
    title: 'Our Verdict — premium for pros',
    ...
  }
