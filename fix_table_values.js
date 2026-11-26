const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');
const pt = guide.productTable;
const cols = pt.columns.map(c => c.title);
const id2Idx = cols.indexOf('Audient iD2');
const volt2Idx = cols.indexOf('Universal Audio Volt 2 Gen 2');
const sslIdx = cols.indexOf('SSL 2+ MKII');

// 1. Audient iD2 column
pt.rows.forEach(row => {
  if (row.label === 'Inputs / Outputs') {
    row.values[id2Idx].value = '10-in / 6-out (2-in / 4-out analog + ADAT)';
    if (row.values[id2Idx].value_es) row.values[id2Idx].value_es = '10-in / 6-out (2-in / 4-out analógico + ADAT)';
  }
  if (row.label === 'Preamps') {
    row.values[id2Idx].value = '2, 75 dB gain';
    if (row.values[id2Idx].value_es) row.values[id2Idx].value_es = '2, 75 dB de ganancia';
  }
  if (row.label === 'Sample Rate') {
    row.values[id2Idx].value = '192 kHz';
    if (row.values[id2Idx].value_es) row.values[id2Idx].value_es = '192 kHz';
  }
  if (row.label === 'Bit Depth') {
    row.values[id2Idx].value = '32-bit';
    if (row.values[id2Idx].value_es) row.values[id2Idx].value_es = '32-bit';
  }
  if (row.label === 'Special Features') {
    row.values[id2Idx].value = 'Smartgain, RoomTune, DSP FX, JFET DI, ADAT';
    if (row.values[id2Idx].value_es) row.values[id2Idx].value_es = 'Smartgain, RoomTune, DSP FX, JFET DI, ADAT';
  }
});

// 2. Universal Audio Volt 2 Gen 2 column
pt.rows.forEach(row => {
  if (row.label === 'Best For') {
    row.values[volt2Idx].value = 'Tone-shaping & easy workflow';
    if (row.values[volt2Idx].value_es) row.values[volt2Idx].value_es = 'Moldeado tonal y flujo de trabajo fácil';
  }
  if (row.label === 'Preamps') {
    row.values[volt2Idx].value = '2, 60 dB gain';
    if (row.values[volt2Idx].value_es) row.values[volt2Idx].value_es = '2, 60 dB de ganancia';
  }
  if (row.label === 'Bit Depth') {
    row.values[volt2Idx].value = '32-bit';
    if (row.values[volt2Idx].value_es) row.values[volt2Idx].value_es = '32-bit';
  }
  if (row.label === 'Special Features') {
    row.values[volt2Idx].value = 'Tone Shaping (3 modes), Smart Display, Auto-Gain, loopback';
    if (row.values[volt2Idx].value_es) row.values[volt2Idx].value_es = 'Moldeado tonal (3 modos), Smart Display, Auto-Gain, loopback';
  }
});

// 3. SSL 2+ MKII: Sample Rate and Bit Depth
pt.rows.forEach(row => {
  if (row.label === 'Sample Rate') {
    row.values[sslIdx].value = '192 kHz';
    if (row.values[sslIdx].value_es) row.values[sslIdx].value_es = '192 kHz';
  }
  if (row.label === 'Bit Depth') {
    row.values[sslIdx].value = '32-bit';
    if (row.values[sslIdx].value_es) row.values[sslIdx].value_es = '32-bit';
  }
});

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
const pt2 = updated.productTable;
const cols2 = pt2.columns.map(c => c.title);
const id2Idx2 = cols2.indexOf('Audient iD2');
const volt2Idx2 = cols2.indexOf('Universal Audio Volt 2 Gen 2');
const sslIdx2 = cols2.indexOf('SSL 2+ MKII');

console.log('=== VERIFICATION ===');
pt2.rows.forEach(row => {
  console.log(row.label + ':');
  console.log('  iD2:', row.values[id2Idx2].value);
  console.log('  Volt2Gen2:', row.values[volt2Idx2].value);
  console.log('  SSL:', row.values[sslIdx2].value);
});