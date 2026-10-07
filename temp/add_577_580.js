const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
// 1) products.json
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
[577, 578, 579, 580].forEach(id => { if (P.some(x => x.id === id)) throw new Error(id + ' already exists'); });
P.push({
  id: 577,
  title: 'Zoom G11',
  title_es: 'Zoom G11',
  brand: 'Zoom',
  category: 'pedals',
  price: 799.99,
  desc: 'Zoom\u2019s flagship floor multi-effects: 5-inch color touchscreen with drag-and-drop chaining of amp plus up to nine effects, 22 cab emulations with 70 built-in IRs plus 130 user slots, 240 patches, 5-minute stereo looper, 68 rhythm patterns, dual send/return loops, 5-pin MIDI and USB audio interface.',
  desc_es: 'El multiefectos insignia de Zoom: pantalla táctil a color de 5 pulgadas con encadenado por arrastre de ampli más hasta nueve efectos, 22 emulaciones de pantalla con 70 IR integrados más 130 ranuras de usuario, 240 patches, looper estéreo de cinco minutos, 68 patrones de ritmo, dos bucles de envío/retorno, MIDI de 5 pines e interfaz de audio USB.',
  img: 'https://r2.gear4music.com/media/86/866573/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/item--ZOMZG11',
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Zoom-G11-Multi-Effects-Processor/54OK'
  }
});
P.push({
  id: 578,
  title: 'Boss GT-1000CORE',
  title_es: 'Boss GT-1000CORE',
  brand: 'Boss',
  category: 'pedals',
  price: 599.99,
  desc: 'The full GT-1000 engine in a stompbox: 24 simultaneous effects blocks with AIRD amp modeling, 32-bit/96kHz processing, 250 user patches, 16 user IR slots, looper, dual FX loops, TRS MIDI and USB audio/MIDI.',
  desc_es: 'El motor GT-1000 completo en un stompbox: 24 bloques de efectos simultáneos con modelado AIRD, procesado de 32 bits/96 kHz, 250 patches de usuario, 16 ranuras de IR, looper, dos bucles de efectos, MIDI TRS y audio/MIDI USB.',
  img: 'https://r2.gear4music.com/media/69/690952/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/item--BOSGT1000CORE',
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Boss-GT-1000Core-Guitar-Effects-Processor/3LJS'
  }
});
P.push({
  id: 579,
  title: 'Neural DSP Quad Cortex',
  title_es: 'Neural DSP Quad Cortex',
  brand: 'Neural DSP',
  category: 'pedals',
  price: 1799.00,
  desc: 'Neural DSP\u2019s floor modeler with 2GHz quad-core DSP: Neural Capture cloning of amps and cabs, 7-inch multi-touch display, 11 stomp+rotary actuators, WiFi cloud sharing, plugin integration and USB audio interface.',
  desc_es: 'El modelador de suelo de Neural DSP con DSP quad-core a 2 GHz: clonación Neural Capture de amplis y pantallas, pantalla multitáctil de 7 pulgadas, 11 actuadores stomp+rotary, nube por WiFi, integración de plugins e interfaz de audio USB.',
  img: 'https://r2.gear4music.com/media/100/1008072/1200/preview_1.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/item--NERQC',
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Neural-DSP-Quad-Cortex/61MZ'
  }
});
P.push({
  id: 580,
  title: 'Mooer GE300',
  title_es: 'Mooer GE300',
  brand: 'Mooer',
  category: 'pedals',
  price: 475.00,
  desc: 'Mooer\u2019s flagship floor modeler: 108 amp models, 164 effects and 43 cab models with dual-DSP processing, Tone Capture sampling, tri-voice synth engine, 5-inch display, 30-minute looper, MIDI and USB audio.',
  desc_es: 'El modelador insignia de Mooer: 108 modelos de ampli, 164 efectos y 43 pantallas con procesado dual-DSP, muestreo Tone Capture, motor de sinte de tres voces, pantalla de 5 pulgadas, looper de 30 minutos, MIDI y audio USB.',
  img: 'https://omo-oss-image1.thefastimg.com/portal-saas/new2022113010221252588/cms/image/bb706be0-8332-49e2-b430-1c7ef5777d83.jpg?vf=B7gH3s',
  stores: {
    gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Mooer-GE300-Multi-Effects-Pedal/2UHQ'
  }
});
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('577-580 added to products.json');
// 2) TEST_SHOP_BTN
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  576: { prices: { official: "$699.99", gear4music: "£559.00" } },';
if (!s.includes(anchor)) throw new Error('576 anchor not found');
const entry = eol + '  577: { prices: { zzounds: "$799.99" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Zoom-G11-Multi-Effects-Processor/54OK" }, oos: ["gear4music"] },'
  + eol + '  578: { prices: { zzounds: "$659.99", gear4music: "£539.00" } },'
  + eol + '  579: { prices: { zzounds: "$1,799.00" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Neural-DSP-Quad-Cortex/61MZ" } },'
  + eol + '  580: { urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Mooer-GE300-Multi-Effects-Pedal/2UHQ" }, oos: ["gear4music"] },';
s = s.replace(anchor, anchor + entry);
fs.writeFileSync(bFile, s);
console.log('577-580 added to TEST_SHOP_BTN');
// 3) ADDED_OK
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
if (!v.includes("'576'")) throw new Error('576 not in ADDED_OK');
['577', '578', '579', '580'].forEach(k => { if (v.includes("'" + k + "'")) throw new Error(k + ' already whitelisted'); });
v = v.replace("'575', '576']", "'575', '576', '577', '578', '579', '580']");
fs.writeFileSync(vFile, v);
console.log('577-580 whitelisted');
