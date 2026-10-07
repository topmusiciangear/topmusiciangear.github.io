const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const pFile = DIR + 'data/products.json';
const P = JSON.parse(fs.readFileSync(pFile, 'utf8'));
[591, 592, 593, 594, 595, 596, 597, 598, 599].forEach(id => { if (P.some(x => x.id === id)) throw new Error(id + ' already exists'); });
P.push({ id: 591, title: 'Strymon TimeLine', title_es: 'Strymon TimeLine', brand: 'Strymon', category: 'pedals', price: 449.00,
  desc: 'Strymon\u2019s studio-class stereo delay: 12 delay machines on SHARC DSP, 200 presets, 30-second stereo looper, full MIDI implementation and expression input.',
  desc_es: 'El delay estéreo de clase estudio de Strymon: 12 máquinas con DSP SHARC, 200 presets, looper estéreo de 30 segundos, MIDI total y entrada de expresión.',
  img: 'https://www.strymon.net/wp-content/uploads/2021/03/timeline_topdown_grad_1600.jpeg',
  stores: { zzounds: 'https://www.zzounds.com/item--STMTIMELINE' } });
P.push({ id: 592, title: 'Meris LVX', title_es: 'Meris LVX', brand: 'Meris', category: 'pedals', price: 599.00,
  desc: 'Meris\u2019s modular delay system: freely connectable processing elements, 60-second stereo looper, 99 presets, color screen UI, MIDI, expression control and premium analog path.',
  desc_es: 'El sistema modular de delay de Meris: elementos conectables libremente, looper estéreo de 60 segundos, 99 presets, UI a color, MIDI, expresión y ruta analógica premium.',
  img: 'https://meris.us/wp-content/uploads/2022/05/LVX_product_pg.jpg',
  stores: { gear4music: 'https://www.gear4music.com/Guitar-and-Bass/Meris-LVX-Modular-Delay-System-Pedal/4V7F' } });
P.push({ id: 593, title: 'Eventide TimeFactor', title_es: 'Eventide TimeFactor', brand: 'Eventide', category: 'pedals', price: 499.00,
  desc: 'Eventide\u2019s dual delay workstation: 10 delay types on two independent lines, 12-second looper, 27 presets, true analog bypass, MIDI, expression input and USB upgrades.',
  desc_es: 'La estación dual de delay de Eventide: 10 tipos en dos líneas independientes, looper de 12 segundos, 27 presets, bypass analógico real, MIDI, expresión y mejoras por USB.',
  img: 'https://cdn.eventideaudio.com/uploads/2021/08/TimeFactor-Wide-Life-Thumb.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--EVTTIMEFACTOR', official: 'https://store.eventideaudio.com/products/timefactor' } });
P.push({ id: 594, title: 'Source Audio Nemesis', title_es: 'Source Audio Nemesis', brand: 'Source Audio', category: 'pedals', price: 299.99,
  desc: 'Source Audio\u2019s stereo multi-delay: 26 engines with analog dry-through, 100 factory presets, Neuro app editing, full MIDI, tap tempo, freeze function and included 9V supply.',
  desc_es: 'El multidelay estéreo de Source Audio: 26 motores con dry analógico, 100 presets de fábrica, edición Neuro, MIDI total, tap tempo, freeze y fuente 9V incluida.',
  img: 'https://sourceaudio.net/cdn/shop/files/p_nemesis_1_b2eee4ed-5ee0-4869-bbda-e67e4a3b13fb.png?v=1764819908&width=800',
  stores: { zzounds: 'https://www.zzounds.com/item--SORNEMESISADT' } });
P.push({ id: 595, title: 'Keeley Caverns V2', title_es: 'Keeley Caverns V2', brand: 'Keeley', category: 'pedals', price: 199.00,
  desc: 'Keeley\u2019s two-in-one reverb and delay: 650ms modulated tape-style delay plus spring, shimmer and modulated reverbs, true-bypass or trails, 9V battery or adapter at 75mA.',
  desc_es: 'El dos-en-uno de Keeley: delay tape de 650 ms más reverbs spring, shimmer y modulada, true-bypass o trails, pila 9V o adaptador a 75 mA.',
  img: 'https://robertkeeley.com/wp-content/uploads/2017/07/Caverns-Delay-Reverb-v2-Keeley-Electronics.png',
  stores: { zzounds: 'https://www.zzounds.com/item--KEECAVERNSV2' } });
P.push({ id: 596, title: 'Universal Audio Del-Verb', title_es: 'Universal Audio Del-Verb', brand: 'Universal Audio', category: 'pedals', price: 349.00,
  desc: 'Universal Audio\u2019s reverb+delay combo: vintage spring, plate and hall reverbs plus tape, analog and digital delays, dual engines, tap tempo and app control.',
  desc_es: 'El combo reverb+delay de Universal Audio: reverbs spring, plate y hall vintage más delays tape, analógicos y digitales, motores duales, tap tempo y app.',
  img: 'https://www.uaudio.com/cdn/shop/files/del_verb_gallery_1_MIDI.png?crop=center&height=1024&v=1762873691&width=1024',
  stores: { zzounds: 'https://www.zzounds.com/item--UADDELVERB' } });
P.push({ id: 597, title: 'MXR Carbon Copy', title_es: 'MXR Carbon Copy', brand: 'MXR', category: 'pedals', price: 149.99,
  desc: 'MXR\u2019s all-analog delay: bucket-brigade warmth with 600ms delay time, modulation switch, three-knob layout, true bypass, 9V battery or adapter.',
  desc_es: 'El delay analógico de MXR: calidez bucket-brigade con 600 ms, modulación, tres mandos, true bypass, pila 9V o adaptador.',
  img: 'https://cdn11.bigcommerce.com/s-n26aknlnlm/products/607/images/6299/11169000001.MAIN__89194.1663874794.386.513.jpg?c=2',
  stores: { zzounds: 'https://www.zzounds.com/item--MXRCC' } });
P.push({ id: 598, title: 'Universal Audio Golden Reverberator', title_es: 'Universal Audio Golden Reverberator', brand: 'Universal Audio', category: 'pedals', price: 349.00,
  desc: 'Universal Audio\u2019s flagship reverb: golden-unit springs, German plates and vintage digital halls, dual engines, Live/Preset modes, true or trails bypass, app control.',
  desc_es: 'La reverb insignia de Universal Audio: springs golden-unit, plates alemanas y halls digitales vintage, motores duales, modos Live/Preset, bypass true o trails, app.',
  img: 'https://www.uaudio.com/cdn/shop/files/golden_gallery_1_MIDI.png?crop=center&height=1024&v=1762873661&width=1024',
  stores: { zzounds: 'https://www.zzounds.com/item--UADGOLD' } });
P.push({ id: 599, title: 'Boss RV-200', title_es: 'Boss RV-200', brand: 'Boss', category: 'pedals', price: 320.99,
  desc: 'Boss\u2019s streamlined reverb workstation: 12 reverb types including Arpverb, 127 memories, Hold/Warp/Twist performance effects, TRS MIDI, stereo I/O and 3xAA or adapter power.',
  desc_es: 'La estación de reverb compacta de Boss: 12 tipos con Arpverb, 127 memorias, efectos Hold/Warp/Twist, MIDI TRS, estéreo y 3xAA o adaptador.',
  img: 'https://static.roland.com/assets/images/products/main/rv-200_main.jpg',
  stores: { zzounds: 'https://www.zzounds.com/item--BOSRV200' } });
fs.writeFileSync(pFile, JSON.stringify(P, null, 2) + '\n');
console.log('591-599 added to products.json');
const bFile = DIR + 'build-guides.js';
let s = fs.readFileSync(bFile, 'utf8');
const eol = s.includes('\r\n') ? '\r\n' : '\n';
const anchor = '  590: { prices: { zzounds: "$159.99" } },';
if (!s.includes(anchor)) throw new Error('590 anchor not found');
const entry = eol + '  591: { prices: { zzounds: "$449.00" } },'
  + eol + '  592: { urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Meris-LVX-Modular-Delay-System-Pedal/4V7F" } },'
  + eol + '  593: { urls: { zzounds: "https://www.zzounds.com/item--EVTTIMEFACTOR" }, oos: ["zzounds"] },'
  + eol + '  594: { prices: { zzounds: "$299.99" } },'
  + eol + '  595: { prices: { zzounds: "$199.00" } },'
  + eol + '  596: { prices: { zzounds: "$349.00" } },'
  + eol + '  597: { prices: { zzounds: "$149.99" } },'
  + eol + '  598: { prices: { zzounds: "$349.00" } },'
  + eol + '  599: { prices: { zzounds: "$320.99" } },';
s = s.replace(anchor, anchor + entry);
fs.writeFileSync(bFile, s);
console.log('591-599 added to TEST_SHOP_BTN');
const vFile = DIR + 'temp/pb_verify_data.js';
let v = fs.readFileSync(vFile, 'utf8');
if (!v.includes("'590'")) throw new Error('590 not in ADDED_OK');
['591', '592', '593', '594', '595', '596', '597', '598', '599'].forEach(k => { if (v.includes("'" + k + "'")) throw new Error(k + ' already whitelisted'); });
v = v.replace("'588', '590']", "'588', '590', '591', '592', '593', '594', '595', '596', '597', '598', '599']");
fs.writeFileSync(vFile, v);
console.log('591-599 whitelisted');
