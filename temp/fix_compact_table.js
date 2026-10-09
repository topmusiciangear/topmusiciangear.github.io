const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'compact-rhythm-devices');
const cols = guide.productTable.columns.map(c => c.title);
const rows = guide.productTable.rows;

function fix(labelEn, colTitle, valEn, valEs) {
  const row = rows.find(r => r.label === labelEn);
  if (!row) { console.log('MISSING ROW:', labelEn); return; }
  const ci = cols.indexOf(colTitle);
  if (ci < 0) { console.log('MISSING COL:', colTitle); return; }
  row.values[ci].value = valEn;
  row.values[ci].value_es = valEs;
  console.log('Fixed:', labelEn, '/', colTitle, '->', valEn);
}

// 1. P-6: Tracks "16 voces" -> "6 sample tracks / pads"
fix('Tracks', 'Roland AIRA Compact P-6', '6 sample tracks / pads', '6 pistas de sample / pads');

// 2. Tracker Mini: Tracks + Battery
fix('Tracks', 'Polyend Tracker Mini', '8 audio + 8 synth/MIDI', '8 de audio + 8 de sinte/MIDI');
fix('Battery', 'Polyend Tracker Mini', 'Built-in Li-ion, up to 8 hours', 'Batería Li-ion integrada, hasta 8 horas');

// 3. SEQTRAK: Tracks + Battery
fix('Tracks', 'Yamaha SEQTRAK', '11 tracks (7 drum, 2 AWM2, 1 DX FM, 1 sampler)', '11 pistas (7 batería, 2 AWM2, 1 DX FM, 1 sampler)');
fix('Battery', 'Yamaha SEQTRAK', 'Built-in Li-ion, 3-4 hours', 'Batería Li-ion integrada, 3-4 horas');

// 4. Liven Lofi-12: Tracks "10 voces" -> "4 tracks"
fix('Tracks', 'Sonicware Liven Lofi-12', '4 tracks', '4 pistas');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
