const fs = require('fs');
const consolidated = require('C:/Users/Daniel/projects/topmusiciangear/temp/consolidated_scores.json');

const extraOverrides = {
  'j48-vs-rndi': {
    'Caja Directa Activa Radial J48 MK2': 9.6,
    'Radial J48 MK2 Active Direct Box': 9.6,
    'Interfaz Directa Activa Rupert Neve Designs RNDI': 9.4,
    'Rupert Neve Designs RNDI Active Direct Interface': 9.4
  },
  'rme-vs-motu': {
    'RME Babyface Pro FS': 9.8,
    'MOTU M2': 9.4
  },
  'best-interface': {
    'RME Babyface Pro FS': 9.8,
    'Universal Audio Apollo Twin X Gen 2': 9.7,
    'Audient iD14 MkII': 9.5,
    'SSL 2+ MKII': 9.4,
    'Focusrite Scarlett 2i2 4th Gen': 9.3,
    'MOTU M2': 9.2,
    'Universal Audio Volt 276': 9.1,
    'Universal Audio Volt 2': 9.1,
    'IK Multimedia AXE I/O': 9.0
  },
  'starter-studio': {
    'Rode NT1 Signature Series': 9.5,
    'SSL 2+ MKII': 9.6,
    'Focusrite Scarlett 2i2 4th Gen': 9.7,
    'PreSonus Eris Studio 5': 8.9,
    'KRK Rokit 7 G5': 9.3,
    'Yamaha HS8': 9.8,
    'Universal Audio Apollo Twin X Gen 2': 9.8,
    'Neumann TLM 102': 9.8,
    'Paneles de Tratamiento Acustico G4M Acoustics Squarewave (4-Unidades)': 9.4,
    'G4M Acoustics Squarewave Acoustic Treatment Panels (4-Pack)': 9.4,
    'Soporte de Microfono K&M 210/2': 9.6,
    'K&M 210/2 Mic Stand': 9.6,
    'Filtro Antipop Aston Microphones Shield GN': 9.1,
    'Aston Microphones Shield GN Pop Filter': 9.1,
    'Cable Mogami Gold Studio XLR': 9.3,
    'Mogami Gold Studio XLR Cable': 9.3,
    'Rode NT1 5th Generation': 9.6,
    'Audio-Technica ATH-M50x': 9.5,
    'Audio-Technica ATH-M20x': 9.0,
    'Sony MDR-7506': 9.4
  },
  'budget-usb-mics': {
    'Samson Q2U USB/XLR Microphone': 9.8,
    'Rode NT-USB Mini Studio Condenser Microphone': 9.5,
    'FIFINE AmpliGame AM8 Dynamic USB Microphone': 9.4,
    'Maono PD200X Dynamic Microphone': 9.2,
    'FIFINE AmpliTank K688 Dynamic USB/XLR Microphone': 9.1,
    'TONOR TC-777 USB Microphone': 9.0,
    'Blue Yeti Nano USB Condenser Microphone': 8.9,
    'Maono PM461 USB Microphone': 8.9,
    'FIFINE T669 USB Microphone Kit': 8.9,
    'Razer Seiren V3 Mini': 8.9,
    'FIFINE AmpliGame A6V USB Gaming Microphone': 9.0
  },
  'budget-interfaces': {
    'Focusrite Scarlett 2i2 4th Gen': 9.7,
    'MOTU M2': 9.4,
    'Universal Audio Volt 2': 9.1,
    'SSL 2+ MKII': 9.6,
    'Audient iD14 MkII': 9.8,
    'Audient EVO 4': 9.0,
    'Behringer U-Phoria UMC1820': 8.8,
    'Universal Audio Volt 276': 9.2,
    'Arturia MiniFuse 2': 8.7
  }
};

const allScores = {};
for (const [gid, map] of Object.entries(require('C:/Users/Daniel/projects/topmusiciangear/temp/consolidated_scores.json'))) {
  allScores[gid] = map;
}

for (const [gid, map] of Object.entries(extraOverrides)) {
  if (!allScores[gid]) allScores[gid] = {};
  for (const [name, score] of Object.entries(map)) {
    allScores[gid][name] = score;
  }
}

const output = 'module.exports = ' + JSON.stringify(allScores, null, 2) + ';';
require('fs').writeFileSync('temp/score_overrides.js', output, 'utf8');
console.log('Fixed score_overrides.js');