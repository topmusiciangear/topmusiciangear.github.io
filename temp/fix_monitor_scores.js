const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ============================================================
// SCORES CORREGIDOS - MONITORES (basados en reviews profesionales)
// Jerarquia real: S > A > B > C
// ============================================================

const MONITOR_SCORES = {
  // S tier - Referencia profesional (9.0+)
  'Genelec 8351B SAM 3-Way Coaxial Studio Monitor': 9.6,
  'Neumann KH 80 DSP': 9.5,
  'Adam Audio A7V': 9.4,
  'Focal Trio11 Be': 9.4,
  'Barefoot Sound MicroSub45 Dual-Force 8" Active Studio Subwoofer (Pair)': 9.4,
  'Focal Sub12': 9.3,
  'Genelec 7370A SAM 12" Smart Active Studio Subwoofer': 9.3,
  'Neumann KH 750 DSP 10" Powered Studio Subwoofer': 9.2,
  'Neumann KH 810 II 10" Powered Studio Subwoofer': 9.1,
  'Genelec 7050C Studio Subwoofer': 9.0,
  'ATC SCS120 Pro Active Studio Subwoofer': 9.0,
  'ATC SCM25A Pro Mk2': 9.0,
  'ADAM Audio S3H': 9.0,

  // A tier - Profesional / Avanzado (8.7-8.9)
  'Genelec 8010A': 9.2,
  'Focal Alpha 65 Evo': 9.1,
  'Focal Alpha 50 Evo': 9.0,
  'Yamaha HS8': 9.0,
  'Kali Audio LP-6 V2': 8.9,
  'Kali Audio IN-8 V2': 8.8,
  'Adam Audio T5V': 8.8,
  'ADAM Audio D3V': 8.7,
  'JBL 305P MkII': 8.7,
  'Kali Audio LP-UNF': 8.6,
  'Kali Audio IN-UNF': 8.5,
  'Kali Audio WS-6.2': 8.4,
  'Yamaha HS8S': 8.3,
  'KRK Rokit 7 G5': 8.3,
  'KRK S10.4': 8.2,
  'Adam T10S': 8.2,
  'IK Multimedia iLoud MTM MKII': 8.4,
  'IK Multimedia iLoud Micro Monitor Pro': 8.1,
  'IK Multimedia iLoud Sub': 8.0,

  // B tier - Bueno / Mejor valor (8.0-8.3)
  'Mackie CR4.5': 8.3,
  'PreSonus Eris 3.5 2nd Gen': 8.2,
  'Mackie CR3.5': 8.1,
  'PreSonus Eris E3.5': 8.1,
  'M-Audio BX4': 8.0,
  'Yamaha HS5': 8.0,
  'PreSonus Eris E4.5': 8.0,
  'Mackie CR3-X': 8.0,

  // C tier - Básico / Entry (7.4-7.9)
  'Behringer Truth 3.5 BT': 7.9,
  'KRK Rokit 5 G5': 7.9,
  'PreSonus Eris Studio 5': 7.9,
  'Behringer Truth B2031A': 7.8,
  'M-Audio BX3': 7.7,
  'Samson Resolv SE5': 7.6,
  'Edifier R1280T': 7.5,
  'Edifier MR3': 7.4,
};

let changed = 0;
products.forEach(p => {
  const key = Object.keys(MONITOR_SCORES).find(k => p.title === k || p.title_es === k);
  if (key && p.score !== MONITOR_SCORES[key]) {
    console.log('  ' + p.title + ': ' + p.score + ' -> ' + MONITOR_SCORES[key]);
    p.score = MONITOR_SCORES[key];
    changed++;
  }
});

fs.writeFileSync(B + 'data/products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('\nMonitores corregidos: ' + changed);