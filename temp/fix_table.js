const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-samplers-drum-computers');
const cols = guide.productTable.columns.map(c => c.title);
const rows = guide.productTable.rows;

function fixRow(labelEn, colTitle, valEn, valEs) {
  const row = rows.find(r => r.label === labelEn);
  if (!row) { console.log('MISSING ROW:', labelEn); return; }
  const ci = cols.indexOf(colTitle);
  if (ci < 0) { console.log('MISSING COL:', colTitle); return; }
  row.values[ci].value = valEn;
  row.values[ci].value_es = valEs;
  console.log('Fixed:', labelEn, '/', colTitle, '->', valEn);
}

// 1. MPC One G2 (256)
fixRow('Weight', 'Akai MPC One G2', '2.6 kg', '2,6 kg');
fixRow('Sample Memory', 'Akai MPC One G2', '4 GB RAM / 64 GB storage', '4 GB RAM / 64 GB almacenamiento');

// 2. MPC Key 37 Gen 2 (616)
fixRow('Weight', 'Akai MPC Key 37 Gen 2', '4.35 kg', '4,35 kg');
fixRow('Sample Memory', 'Akai MPC Key 37 Gen 2', '4 GB RAM / 64 GB storage', '4 GB RAM / 64 GB almacenamiento');
fixRow('Tracks', 'Akai MPC Key 37 Gen 2', '32 plugin + 16 stereo audio', '32 de plugin + 16 de audio estéreo');
fixRow('Estimated Price', 'Akai MPC Key 37 Gen 2', '$999', '$999');

// 3. MPC Live III (188) - no XLR combo, has 1/4" line in + Phono RCA
fixRow('Audio I/O', 'Akai MPC Live III', '2x 1/4" line in, Phono RCA in, 6x 1/4" out, headphone', '2x 1/4" entrada de línea, entrada RCA Phono, 6x 1/4" salida, auriculares');

// 4. MPC XL (619)
fixRow('Weight', 'Akai MPC XL', '7.2 kg', '7,2 kg');
fixRow('Sample Memory', 'Akai MPC XL', '16 GB RAM / 256 GB NVMe SSD + SATA bay', '16 GB RAM / SSD NVMe 256 GB + bahía SATA');
fixRow('Audio I/O', 'Akai MPC XL', '2x XLR/TRS combo in, 2x 1/4" line in, Phono RCA in, 2x TS instrument in, 8x 1/4" out, 2x headphones', '2x XLR/TRS combo entrada, 2x 1/4" entrada de línea, entrada RCA Phono, 2x TS instrumento entrada, 8x 1/4" salida, 2x auriculares');
fixRow('Connectivity', 'Akai MPC XL', '2x USB-A, USB-B, 2x MIDI in, 4x MIDI out, 16x CV/Gate via 8x TRS', '2x USB-A, USB-B, 2x MIDI entrada, 4x MIDI salida, 16x CV/Gate mediante 8x TRS');

// 5. Digitakt II (127)
fixRow('Sample Memory', 'Elektron Digitakt II', '400 MB per project / 20 GB internal', '400 MB por proyecto / 20 GB internos');

// 6. P-6 (617)
fixRow('Tracks', 'Roland Aira Compact P-6', '6 audio tracks', '6 pistas de audio');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done. JSON valid.');
