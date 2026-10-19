const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

// === 1. CORREGIR SPECS EN TABLA best-headphones-for-mixing ===
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const m = guides.find(x => x.id === 'best-headphones-for-mixing');
const pt = m.productTable;

// Mapeo de columnas por título
const colIndex = {};
pt.columns.forEach((c, i) => { colIndex[c.title] = i; });

pt.rows.forEach(r => {
  if (r.label === 'Impedance') {
    const i = colIndex['Neumann NDH 30'];
    if (i !== undefined && r.values[i]) {
      console.log('NDH 30 Impedance: ' + r.values[i].value + ' -> 120 Ω');
      r.values[i].value = '120 Ω';
    }
  }
  if (r.label === 'Frequency Response') {
    const i1 = colIndex['Neumann NDH 30'];
    if (i1 !== undefined && r.values[i1]) {
      console.log('NDH 30 Freq: ' + r.values[i1].value + ' -> 12 Hz – 34 kHz');
      r.values[i1].value = '12 Hz – 34 kHz';
    }
    const i2 = colIndex['Sennheiser HD 600'];
    if (i2 !== undefined && r.values[i2]) {
      console.log('HD 600 Freq: ' + r.values[i2].value + ' -> 12 Hz – 40.5 kHz');
      r.values[i2].value = '12 Hz – 40.5 kHz';
    }
  }
  if (r.label === 'Sensitivity') {
    const i = colIndex['Neumann NDH 30'];
    if (i !== undefined && r.values[i]) {
      console.log('NDH 30 Sensitivity: ' + r.values[i].value + ' -> 104 dB');
      r.values[i].value = '104 dB';
    }
  }
});

// === 2. ACTUALIZAR SCORES open-headphones ===
const ovPath = B + 'temp/score_overrides.js';
let ov = fs.readFileSync(ovPath, 'utf8');

const oldBlock = `'open-headphones': {
    // Conclusion: "the modern reference standard".
    'Sennheiser HD 490 Pro Plus': 9.8,
    // Conclusion: "the new Tesla flagship for mixing and mastering".
    'Beyerdynamic DT 1990 Pro MKII': 9.5,
    // Conclusion: "the timeless classic that mastering engineers still trust".
    'Sennheiser HD 600': 9.4,
    // Conclusion: "the premium choice when you need razor-sharp detail".
    'Neumann NDH 30': 9.3,
    // Conclusion: "delivers professional accuracy with lightweight comfort".
    'Audio-Technica ATH-R70xa': 9.2,
    // Conclusion: "brings a wide, spacious soundstage".
    'Beyerdynamic DT 990 Pro': 9.1,
    // Conclusion: "the amp-free sweet spot for home studios".
    'Beyerdynamic DT 900 Pro X': 9.0,
    // Conclusion: "keeps planar magnetic detail for purists".
    'Audeze LCD-X': 9.5,`;

const newBlock = `'open-headphones': {
    // Criterio: rendimiento acustico puro (fidelidad + espacialidad para mezcla E hi-fi).
    // Caracteristicas fisicas (cables, peso, impedancia) fuera de la ecuacion.
    // LCD-X: planar de 106mm, graves hasta 10Hz reales sin distorsion, textura 3D.
    'Audeze LCD-X': 9.8,
    // DT 1990 Pro MKII: drivers Tesla, resolucion quirurgica para mezcla, dinamica impactante para hi-fi.
    'Beyerdynamic DT 1990 Pro MKII': 9.7,
    // HD 490 Pro Plus: ultra-plano para mezcla, pero penaliza en hi-fi por ser demasiado analitico.
    'Sennheiser HD 490 Pro Plus': 9.5,
    // NDH 30: transparencia cristalina, simula monitores de estudio en sala tratada.
    'Neumann NDH 30': 9.5,
    // HD 600: naturalidad timbrica, pero caida en subgraves limita musica electronica moderna.
    'Sennheiser HD 600': 9.3,
    // ATH-R70x: equilibrio plano para mezcla, presentacion espaciosa y aireada para hi-fi.
    'Audio-Technica ATH-R70xa': 9.2,
    // DT 900 Pro X: detallado, abierto, distorsion muy baja, sin profundidad 3D de los superiores.
    'Beyerdynamic DT 900 Pro X': 9.0,
    // DT 990 Pro: buen escenario abierto, pero pico de agudos fatigante en sesiones largas.
    'Beyerdynamic DT 990 Pro': 8.7,`;

if (!ov.includes(oldBlock)) {
  console.error('ERROR: no se encontro el bloque open-headphones en score_overrides.js');
  process.exit(1);
}
ov = ov.replace(oldBlock, newBlock);
fs.writeFileSync(ovPath, ov, 'utf8');
console.log('score_overrides.js actualizado.');

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Todo listo.');
