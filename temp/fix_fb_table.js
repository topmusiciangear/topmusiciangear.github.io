const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'fender-bass-guide');
const ti = g.productTable.columns.map(c => c.title);
const setCell = (label, col, en, es) => {
  const r = g.productTable.rows.find(x => x.label === label);
  if (!r) die('sin fila: ' + label);
  const i = ti.indexOf(col);
  if (i === -1) die('sin columna: ' + col);
  const before = r.values[i].value + ' / ' + r.values[i].value_es;
  r.values[i] = { value: en, value_es: es };
  console.log('[' + label + '] ' + col + '\n   ' + before + '\n   -> ' + en + ' / ' + es);
};

// (1) VERDADERO — Fender oficial: "9.5-Radius Maple or Rosewood Fingerboard with Rolled Edges", 20 medium jumbo
setCell('Frets & Fretboard', 'Fender Player II Precision Bass',
  '20, maple or rosewood, rolled edges', '20, arce o palisandro, bordes redondeados');
setCell('Frets & Fretboard', 'Fender Player II Jazz Bass',
  '20, maple or rosewood, rolled edges', '20, arce o palisandro, bordes redondeados');

// (2) INVERTIDO — Fender oficial: el S-1 del volumen SELECCIONA activo/pasivo; el mini-toggle es el selector de frecuencia de medios (325/750 Hz)
setCell('Active/Passive', 'Fender American Ultra II Precision Bass',
  'Active/Passive (S-1 switch on volume)', 'Activo/Pasivo (S-1 en el volumen)');
setCell('Electronics', 'Fender American Ultra II Precision Bass',
  'Passive tone, 3-band active EQ, S-1 active/passive, midrange 325/750 Hz',
  'Tono pasivo, EQ activa 3 bandas, S-1 activo/pasivo, medios 325/750 Hz');

// (3) FALSO — Fender oficial y Sweetwater: cuerpo de POPLAR. No se cambia.

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nOK');