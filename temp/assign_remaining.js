const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Verificar monitores clave
console.log('=== MONITORES CLAVE ===');
['Yamaha HS8', 'JBL 305P MkII', 'Kali Audio LP-6 V2', 'Genelec 8010A', 'Neumann KH 80 DSP',
 'Adam Audio A7V', 'Genelec 8351B', 'KRK Rokit 7 G5', 'Mackie CR4.5', 'PreSonus Eris 3.5 2nd Gen'].forEach(n => {
  const p = products.find(x => x.title === n);
  console.log('  ' + n + ': ' + (p ? p.score : 'NO ENCONTRADO'));
});

// Asignar scores a productos sin score por categoría
console.log('\n=== ASIGNANDO SCORES RESTANTES ===');
const CATEGORY_SCORES = {
  // Categoria -> score base
  'monitors': 7.5,
  'microphones': 8.0,
  'headphones': 8.0,
  'interfaces': 8.0,
  'daw': 9.0,
  'plugins': 8.5,
  'guitars': 8.0,
  'basses': 8.0,
  'amps': 8.0,
  'live_sound': 8.0,
  'mixers': 8.0,
  'keyboards': 8.0,
  'drum-machine': 8.5,
  'samplers': 8.5,
  'groovebox': 8.0,
  'pedals': 8.0,
  'streaming': 8.0,
  'accessories': 7.5,
};

let assigned = 0;
products.forEach(p => {
  if (p.score !== undefined) return;
  const cat = p.category || '';
  let base = CATEGORY_SCORES[cat] || 7.5;
  // Ajustes por tier dentro de categoria
  if (cat === 'monitors') {
    if (/Genelec|Neumann|ADAM|ATC|Barefoot|Focal/i.test(p.title)) base = 8.8;
    else if (/Kali|Yamaha|JBL|KRK/i.test(p.title)) base = 8.2;
    else if (/Mackie|PreSonus|M-Audio|Behringer/i.test(p.title)) base = 7.8;
    else if (/Edifier|IK Multimedia/i.test(p.title)) base = 7.5;
  } else if (cat === 'microphones') {
    if (/Neumann|AKG|Coles|Royer|DPA|Sennheiser MKH/i.test(p.title)) base = 9.0;
    else if (/Shure|Rode|Audio-Technica|Sennheiser/i.test(p.title)) base = 8.5;
    else if (/Behringer|Samson|FIFINE|Maono|TONOR|Razer/i.test(p.title)) base = 7.8;
  } else if (cat === 'headphones') {
    if (/Audeze|Sennheiser HD 6|Neumann|DT 1990|DT 900/i.test(p.title)) base = 9.0;
    else if (/Beyerdynamic|Audio-Technica|Sony|AKG|Focal/i.test(p.title)) base = 8.5;
    else if (/Samson|Shure SRH/i.test(p.title)) base = 7.8;
  } else if (cat === 'interfaces') {
    if (/RME|Universal Audio Apollo|Antelope|Neumann MT/i.test(p.title)) base = 9.2;
    else if (/SSL|Focusrite|Audient|MOTU/i.test(p.title)) base = 8.7;
    else if (/Behringer|Arturia|IK Multimedia/i.test(p.title)) base = 8.0;
  } else if (cat === 'daw') {
    base = 9.0;
  } else if (cat === 'plugins') {
    if (/FabFilter|Soundtoys|iZotope|Softube|Valhalla|Eventide/i.test(p.title)) base = 9.2;
    else if (/Waves|Brainworx|Sonible|Tokyo Dawn|Zynaptiq|MeldaProduction/i.test(p.title)) base = 8.7;
    else if (/Arturia|Native Instruments|u-he|Kilohearts|Reveal Sound|Baby Audio|Cableguys|XLN|Excite Audio|Devious Machines|Mastering The Mix/i.test(p.title)) base = 8.5;
  } else if (cat === 'guitars' || cat === 'basses') {
    if (/Gibson|Fender American|Martin|Taylor|Music Man|Dingwall|PRS SE/i.test(p.title)) base = 8.8;
    else if (/Fender Player|Yamaha|Ibanez|Epiphone|Squier Classic/i.test(p.title)) base = 8.3;
    else if (/Squier|Sterling|Sire|G&L|Yamaha BB|Ibanez Gio|Ibanez GSR|Jackson|Jet|Traveler|Steinberger|Kala|Enya|Lava/i.test(p.title)) base = 7.8;
  } else if (cat === 'amps') {
    if (/Vox|Marshall|Fender Rumble|Ampeg|Markbass|Darkglass|Orange Crush Bass|Positive Grid|Boss Waza|Yamaha THR|Boss Katana|Fender Champion|Fender Mustang|Fender Tone Master/i.test(p.title)) base = 8.3;
  } else if (cat === 'live_sound') {
    if (/QSC|JBL|RCF|Electro-Voice|Yamaha|LD Systems|Alto|Turbosound|Bose/i.test(p.title)) base = 8.3;
  } else if (cat === 'mixers') {
    if (/Allen & Heath|Midas|Behringer X32|Behringer WING|Soundcraft|PreSonus|Yamaha|Behringer Xenyx|Tascam|Korg|SSL/i.test(p.title)) base = 8.3;
  } else if (cat === 'keyboards') {
    if (/Nord|Yamaha|Roland|Arturia|Native Instruments|Korg|Casio|M-Audio|Akai/i.test(p.title)) base = 8.3;
  } else if (cat === 'drum-machine' || cat === 'samplers' || cat === 'groovebox') {
    if (/Elektron|Akai|Roland|Native Instruments|Teenage Engineering|Yamaha|Sonicware|Korg|Polyend|Arturia/i.test(p.title)) base = 8.5;
  } else if (cat === 'pedals') {
    if (/Strymon|Eventide|Source Audio|Meris|Keeley|MXR|Wampler|JHS|Fulltone|Ibanez|Boss|TC Electronic|Electro-Harmonix|Walrus|Zoom|Mooer|Neural DSP|Line 6|HeadRush/i.test(p.title)) base = 8.3;
  } else if (cat === 'streaming') {
    if (/Rode|Elgato|Shure|Audio-Technica|HyperX|Blue|Maono|FIFINE|TONOR|Razer|TC Helicon|Mackie|Yamaha|Zoom|Behringer|Roland/i.test(p.title)) base = 8.0;
  }
  p.score = base;
  assigned++;
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Scores asignados por categoria: ' + assigned);
const total = products.filter(p => p.score !== undefined).length;
console.log('Total con score: ' + total + ' de ' + products.length);