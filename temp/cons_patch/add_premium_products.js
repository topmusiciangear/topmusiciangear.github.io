const fs = require('fs');
const R = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = JSON.parse(fs.readFileSync(R, 'utf8'));
const PRODS = Array.isArray(P) ? P : (P.products || []);

function has(title) {
  return PRODS.some(p => String(p.title || '').toLowerCase() === String(title).toLowerCase());
}
const skip = PRODS.map(p => p.title);
console.log('antes: ' + PRODS.length + ' productos');

let next = PRODS.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);

const mt48 = {
  id: ++next,
  title: 'Neumann MT 48 (U) Premium Audio Interface',
  title_es: 'Neumann MT 48 (U) Interfaz de Audio Premium',
  brand: 'Neumann', category: 'interfaces', price: 1495, rating: 4.8, reviews: 412, badge: 'premium',
  desc: 'Desktop USB-C premium audio interface with AES67/Dante, two Neumann mic preamps up to 78 dB gain, touchscreen, DSP EQ+dynamics+reverb, USB/ADAT/AES67. Neumann conversion plus Merging Technologies AD/DA.',
  desc_es: 'Interfaz de escritorio premium USB-C con AES67/Dante, dos previos de micrófono Neumann hasta 78 dB, pantalla táctil, DSP con EQ+dinámica+reverb, USB/ADAT/AES67. Conversión Neumann con AD/DA de Merging Technologies.',
  img: 'https://r2.gear4music.com/media/52/521643/1200/preview.jpg',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/MT48--neumann-mt-48-audio-interface',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Neumann-Neumann-MT-48-U/art-PCM0017584-000',
    andertons: 'https://www.andertons.co.uk/Neumann-MT-48-U-Audio-Interface/',
    amazon: 'https://www.amazon.com/dp/B0CWZQ6VTG',
    gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FNeumann-MT-48-Premium-Audio-Interface%2F5E3S',
    frontendaudio: 'https://www.frontendaudio.com/neumann-mt-48-u-audio-interface/'
  }
};

const x8p = {
  id: ++next,
  title: 'Universal Audio Apollo x8p Gen 2',
  title_es: 'Universal Audio Apollo x8p Gen 2',
  brand: 'Universal Audio', category: 'interfaces', price: 3299, rating: 4.8, reviews: 301, badge: 'premium',
  desc: 'Rack-mount 16x22 Thunderbolt 3 USB-C audio interface with HEXA Core UAD DSP (6 SHARC+), 8 Unison preamps, Auto-Gain, Apollo Monitor Correction, multichannel recording up to 7.1.',
  desc_es: 'Interfaz de rack 16x22 Thunderbolt 3 USB-C con HEXA Core UAD DSP (6 SHARC+), 8 preamplificadores Unison, Auto-Gain, Apollo Monitor Correction y grabación multicanal hasta 7.1.',
  img: 'https://r2.gear4music.com/media/92/927233/1200/preview.jpg',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/ApolloX8PG2E--universal-audio-apollo-x8p-gen-2-essentials-plus-thunderbolt-3-audio-interface',
    zzounds: 'https://www.zzounds.com/a--925521/item--UADX8PG2E',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x8p-Gen2-Studio-/art-PCM0018210-000',
    amazon: 'https://www.amazon.com/dp/B0DC12V1GS',
    samash: 'https://www.samash.com/universal-audio-apollo-x8p-gen-2-essentials-plus-suite'
  }
};

const symphony = {
  id: ++next,
  title: 'Apogee Symphony I/O Mk II 16x16 SE',
  title_es: 'Apogee Symphony I/O Mk II 16x16 SE',
  brand: 'Apogee', category: 'interfaces', price: 5995, rating: 4.7, reviews: 128, badge: 'premium',
  desc: 'Modular rack Thunderbolt 3 / Pro Tools HD / Dante audio interface with up to 32x32 I/O, flagship AD/DA, DualView touchscreen, DB25 analog I/O modules.',
  desc_es: 'Interfaz de rack modular Thunderbolt 3 / Pro Tools HD / Dante con hasta 32x32 I/O, AD/DA insignia, pantalla táctil DualView y módulos analógicos DB25.',
  img: 'https://r2.gear4music.com/media/113/1139053/1200/preview.jpg',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/Symph21616--apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt-3',
    vintageking: 'https://vintageking.com/apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt-3',
    bhphoto: 'https://www.bhphotovideo.com/c/product/1817773-REG/apogee_electronics_sym2_16x16se_tb_dante_thunderbolt_pthd_plus_dante_interface_16x16.html',
    lunchboxaudio: 'https://www.lunchboxaudio.com/apogee-symphony-i-o-mk-ii-16x16-se-thunderbolt/',
    amazon: 'https://www.amazon.com/dp/B07QBQCJ8T'
  }
};

const oria = {
  id: ++next,
  title: 'Audient ORIA Immersive Audio Interface',
  title_es: 'Audient ORIA Interfaz Inmersiva de Audio',
  brand: 'Audient', category: 'interfaces', price: 3499, rating: 4.6, reviews: 89, badge: 'premium',
  desc: 'USB-C immersive audio interface and monitor controller, 16 outputs up to 9.1.6 Dolby Atmos, 2 Audient Console preamps, ADAT/AES expansion, onboard DSP room calibration, Atmos/Room EQ-ready.',
  desc_es: 'Interfaz inmersiva USB-C y controlador de monitores, 16 salidas hasta 9.1.6 Dolby Atmos, 2 previos Audient Console, expansión ADAT/AES, DSP de calibración de sala, lista para Atmos y Room EQ.',
  img: 'https://r2.gear4music.com/media/52/521064/1200/preview.jpg',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/ORIA--audient-oria-immersive-audio-interface-and-monitor-controller',
    musiciansfriend: 'https://www.musiciansfriend.com/pro-audio/audient-oria-immersive-audio-interface-and-monitor-controller/m14719000000000',
    vintageking: 'https://vintageking.com/audient-oria-immersive-audio-interface-and-monitor-controller',
    lunchboxaudio: 'https://www.lunchboxaudio.com/audient-oria-immersive-audio-interface-and-monitor-controller/',
    zzounds: 'https://www.zzounds.com/a--925521/item--ADIORIA'
  }
};

const aurora = {
  id: ++next,
  title: 'Lynx Aurora-n 16 (USB)',
  title_es: 'Lynx Aurora-n 16 (USB)',
  brand: 'Lynx', category: 'interfaces', price: 4199, rating: 4.7, reviews: 76, badge: 'premium',
  desc: '16x16 24-bit/192kHz AD/DA converter with LSlot USB, SynchroLock 2, onboard DSP room correction, Dolby Atmos support, up to 120dB dynamic range for mastering-grade conversion.',
  desc_es: 'Convertidor AD/DA 16x16 24-bit/192kHz con LSlot USB, SynchroLock 2, DSP de corrección de sala integrado, compatibilidad Dolby Atmos y hasta 120dB de rango dinámico para conversión de grado máster.',
  img: 'https://cdn11.bigcommerce.com/s-onqzwyxuwa/images/stencil/1280x1280/products/1224/5543/Aurora-M-16__35699.1686087508.jpg',
  stores: {
    sweetwater: 'https://www.sweetwater.com/store/detail/Aurora16USB--lynx-aurora-n-16-usb',
    purewaveaudio: 'https://purewaveaudio.com/lynx-aurora-n-16-usb',
    lunchboxaudio: 'https://www.lunchboxaudio.com/lynx-aurora-n-16-usb/',
    amazon: 'https://www.amazon.com/dp/B08YDL9Y3M',
    frontendaudio: 'https://www.frontendaudio.com/lynx-aurora-n-16-usb/'
  }
};

const additions = [mt48, x8p, symphony, oria, aurora];
let added = 0;
for (const p of additions) {
  if (has(p.title)) { console.log('SKIP (ya existe): ' + p.title); continue; }
  PRODS.push(p); added++;
}
console.log('añadidos: ' + added + ' -> total ' + PRODS.length);
fs.writeFileSync(R, JSON.stringify(PRODS, null, 1));
console.log('guardado: ' + R);
console.log('nuevos ids: MT48=' + mt48.id + ' x8p=' + x8p.id + ' Symphony=' + symphony.id + ' ORIA=' + oria.id + ' Aurora-n=' + aurora.id);
