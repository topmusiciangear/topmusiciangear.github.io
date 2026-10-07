const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// 1) products.json
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
[574, 575, 576].forEach(id => { if (P.some(x => x.id === id)) throw new Error(id + ' already exists'); });
P.push({
  id: 574,
  title: 'Fender Tone Master Pro',
  title_es: 'Fender Tone Master Pro',
  brand: 'Fender',
  category: 'pedals',
  price: 1499.99,
  rating: 4.8,
  reviews: 44,
  desc: "Fender's flagship multi-effects workstation: over 100 amp and effect models including the officially licensed EVH 5150 III Stealth, a 7-inch color touchscreen with ten footswitch encoders, thousands of built-in IRs with third-party support, a 60-second stereo looper, four effects loops, dual 5-pin MIDI and USB-C audio.",
  desc_es: 'La estación de multiefectos insignia de Fender: más de 100 modelos de amps y efectos con el EVH 5150 III Stealth con licencia oficial, pantalla táctil a color de 7 pulgadas con diez encoders, miles de respuestas de impulso integradas con soporte de terceros, looper estéreo de 60 segundos, cuatro bucles de efectos, MIDI de 5 pines y audio USB-C.',
  img: 'https://r2.gear4music.com/media/99/999618/1200/preview.jpg',
  stores: {
    amazon: 'https://www.amazon.com/dp/B0CCB26C74',
    zzounds: 'https://www.zzounds.com/item--FEN2274900000',
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Fender-Tone-Master-Pro/5SLA',
    andertons: 'https://www.andertons.co.uk/fender-tone-master-pro-multi-effects-workstation/',
    musicstore: 'https://www.musicstore.com/en_OE/EUR/Fender-Tone-Master-Pro/art-GIT0060558-000'
  }
});
P.push({
  id: 575,
  title: 'Fractal Audio FM3 Mk II Turbo',
  title_es: 'Fractal Audio FM3 Mk II Turbo',
  brand: 'Fractal Audio',
  category: 'pedals',
  price: 1099.99,
  rating: 4.9,
  reviews: 163,
  desc: 'Fractal\u2019s compact floor modeler on the Cygnus X2 platform: 512 presets with gapless switching, 8 scenes per preset, UltraRes and DynaCab speaker simulation with over 2,200 factory cabs, three footswitches with mini displays, 4x4 USB audio for recording and re-amping, two expression pedal inputs and a universal internal power supply.',
  desc_es: 'El modelador de suelo compacto de Fractal con plataforma Cygnus X2: 512 presets sin cortes, 8 escenas por preset, simulación de pantallas UltraRes y DynaCab con más de 2200 cabs de fábrica, tres footswitches con mini pantallas, audio USB 4×4 para grabar y hacer reamp, dos entradas de expresión y fuente interna universal.',
  img: 'https://www.fractalaudio.com/wp-content/uploads/2023/07/FM3-Mk-II-Turbo-Front-800.png',
  stores: {
    official: 'https://www.fractalaudio.com/fm3/'
  }
});
P.push({
  id: 576,
  title: 'Hotone Ampero II Stage',
  title_es: 'Hotone Ampero II Stage',
  brand: 'Hotone',
  category: 'pedals',
  price: 699.99,
  desc: 'Hotone\u2019s stage modeler: 90+ amp models, 68 cabs and 460+ effects on dual serial/parallel chains, a 5-inch color touchscreen with five scenes per preset, eight footswitches, XLR mic input with preamp and phantom power, IR loader with 50 custom slots, 60-second stereo looper, 100 drum patterns, 300 presets, MIDI, Bluetooth and 8x8 USB-C audio.',
  desc_es: 'El modelador de escenario de Hotone: más de 90 amplis, 68 pantallas y más de 460 efectos en cadenas duales serie/paralelo, pantalla táctil a color de 5 pulgadas con cinco escenas por preset, ocho footswitches, entrada de micro XLR con previo y alimentación fantasma, cargador de IR con 50 ranuras, looper estéreo de 60 segundos, 100 patrones de ritmo, 300 presets, MIDI, Bluetooth y audio USB-C 8×8.',
  img: 'https://r2.gear4music.com/media/115/1150955/1200/preview.jpg',
  stores: {
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Hotone-Ampero-II-Stage-Multi-Effects-Unit/6T39',
    official: 'https://shop.hotoneaudio.com/products/ampero-ii-stage'
  }
});
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('574-576 added to products.json');
// 2) TEST_SHOP_BTN
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  573: { prices: { amazon: "$1,299.99", zzounds: "$1,299.99", andertons: "£899.00", gear4music: "£899.00", musicstore: "€1,049.00" }, urls: { gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-146-Digital-Piano-Black/86R5" } },';
if (!s.includes(anchor)) throw new Error('573 anchor not found');
const entry = eol + '  574: { prices: { amazon: "$1,469.99", zzounds: "$1,499.99", gear4music: "£1,349.00", andertons: "£1,399.00" } },'
  + eol + '  575: { prices: { official: "$1,099.99" } },'
  + eol + '  576: { prices: { official: "$699.99", gear4music: "£559.00" } },';
s = s.replace(anchor, anchor + entry);
fs.writeFileSync(bFile, s);
console.log('574-576 added to TEST_SHOP_BTN');
// 3) ADDED_OK
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
if (!v.includes("'573'")) throw new Error('573 not in ADDED_OK');
['574', '575', '576'].forEach(k => { if (v.includes("'" + k + "'")) throw new Error(k + ' already whitelisted'); });
v = v.replace("'572', '573']", "'572', '573', '574', '575', '576']");
fs.writeFileSync(vFile, v);
console.log('574-576 whitelisted');
