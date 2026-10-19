const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Asignar scores a productos restantes por categoria
// Todos estan en guias "best of" asi que merecen scores altos
const CATEGORY_BASE = {
  'monitors': 8.5,
  'microphones': 8.5,
  'headphones': 8.5,
  'interfaces': 8.5,
  'daw': 9.0,
  'plugins': 8.5,
  'guitars': 8.5,
  'basses': 8.5,
  'amps': 8.3,
  'live_sound': 8.3,
  'mixers': 8.3,
  'keyboards': 8.3,
  'drum-machine': 8.5,
  'samplers': 8.5,
  'groovebox': 8.3,
  'pedals': 8.3,
  'streaming': 8.3,
  'accessories': 7.8,
};

let assigned = 0;
products.forEach(p => {
  if (p.score !== undefined) return;
  const cat = p.category || '';
  let base = CATEGORY_BASE[cat] || 8.0;

  // Ajustes por tier dentro de categoria
  if (cat === 'monitors') {
    if (/Genelec|Neumann|ADAM|ATC|Barefoot|Focal/i.test(p.title)) base = 9.0;
    else if (/Kali|Yamaha|JBL|KRK/i.test(p.title)) base = 8.5;
    else if (/Mackie|PreSonus|M-Audio|Behringer/i.test(p.title)) base = 8.2;
    else if (/Edifier|IK Multimedia/i.test(p.title)) base = 8.0;
  } else if (cat === 'microphones') {
    if (/Neumann|AKG|Coles|Royer|DPA|Sennheiser MKH/i.test(p.title)) base = 9.2;
    else if (/Shure|Rode|Audio-Technica|Sennheiser/i.test(p.title)) base = 8.7;
    else if (/Behringer|Samson|FIFINE|Maono|TONOR|Razer/i.test(p.title)) base = 8.0;
  } else if (cat === 'headphones') {
    if (/Audeze|Sennheiser HD 6|Neumann|DT 1990|DT 900/i.test(p.title)) base = 9.2;
    else if (/Beyerdynamic|Audio-Technica|Sony|AKG|Focal/i.test(p.title)) base = 8.7;
    else if (/Samson|Shure SRH/i.test(p.title)) base = 8.0;
  } else if (cat === 'interfaces') {
    if (/RME|Universal Audio Apollo|Antelope|Neumann MT/i.test(p.title)) base = 9.3;
    else if (/SSL|Focusrite|Audient|MOTU/i.test(p.title)) base = 8.8;
    else if (/Behringer|Arturia|IK Multimedia/i.test(p.title)) base = 8.2;
  } else if (cat === 'plugins') {
    if (/FabFilter|Soundtoys|iZotope|Softube|Valhalla|Eventide/i.test(p.title)) base = 9.2;
    else if (/Waves|Brainworx|Sonible|Tokyo Dawn|Zynaptiq|MeldaProduction/i.test(p.title)) base = 8.8;
    else if (/Arturia|Native Instruments|u-he|Kilohearts|Reveal Sound|Baby Audio|Cableguys|XLN|Excite Audio|Devious Machines|Mastering The Mix/i.test(p.title)) base = 8.6;
  } else if (cat === 'guitars' || cat === 'basses') {
    if (/Gibson|Fender American|Martin|Taylor|Music Man|Dingwall|PRS SE/i.test(p.title)) base = 9.0;
    else if (/Fender Player|Yamaha|Ibanez|Epiphone|Squier Classic/i.test(p.title)) base = 8.5;
    else if (/Squier|Sterling|Sire|G&L|Yamaha BB|Ibanez Gio|Ibanez GSR|Jackson|Jet|Traveler|Steinberger|Kala|Enya|Lava/i.test(p.title)) base = 8.2;
  } else if (cat === 'amps') {
    if (/Vox|Marshall|Fender Rumble|Ampeg|Markbass|Darkglass|Orange Crush Bass|Positive Grid|Boss Waza|Yamaha THR|Boss Katana|Fender Champion|Fender Mustang|Fender Tone Master/i.test(p.title)) base = 8.4;
  } else if (cat === 'live_sound') {
    if (/QSC|JBL|RCF|Electro-Voice|Yamaha|LD Systems|Alto|Turbosound|Bose/i.test(p.title)) base = 8.4;
  } else if (cat === 'mixers') {
    if (/Allen & Heath|Midas|Behringer X32|Behringer WING|Soundcraft|PreSonus|Yamaha|Behringer Xenyx|Tascam|Korg|SSL/i.test(p.title)) base = 8.4;
  } else if (cat === 'keyboards') {
    if (/Nord|Yamaha|Roland|Arturia|Native Instruments|Korg|Casio|M-Audio|Akai/i.test(p.title)) base = 8.4;
  } else if (cat === 'drum-machine' || cat === 'samplers' || cat === 'groovebox') {
    if (/Elektron|Akai|Roland|Native Instruments|Teenage Engineering|Yamaha|Sonicware|Korg|Polyend|Arturia/i.test(p.title)) base = 8.6;
  } else if (cat === 'pedals') {
    if (/Strymon|Eventide|Source Audio|Meris|Keeley|MXR|Wampler|JHS|Fulltone|Ibanez|Boss|TC Electronic|Electro-Harmonix|Walrus|Zoom|Mooer|Neural DSP|Line 6|HeadRush/i.test(p.title)) base = 8.4;
  } else if (cat === 'streaming') {
    if (/Rode|Elgato|Shure|Audio-Technica|HyperX|Blue|Maono|FIFINE|TONOR|Razer|TC Helicon|Mackie|Yamaha|Zoom|Behringer|Roland/i.test(p.title)) base = 8.2;
  }

  p.score = base;
  assigned++;
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Scores asignados por categoria: ' + assigned);
const total = products.filter(p => p.score !== undefined).length;
console.log('Total con score: ' + total + ' de ' + products.length);