const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-drum-machine');
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

// 1. T-8 price: €199 -> $199
fix('Estimated Price', 'Roland AIRA Compact T-8', '~$199', '~$199');

// 2. Circuit Tracks: weight + price
fix('Weight', 'Novation Circuit Tracks', '0.78 kg', '0,78 kg');
fix('Estimated Price', 'Novation Circuit Tracks', '$299–$349', '$299–$349');

// 3. MPC One G2: weight
fix('Weight', 'Akai MPC One G2', '2.6 kg', '2,6 kg');

// 4. Syntakt: sound engine description
fix('Sound Engine', 'Elektron Syntakt', 'Hybrid synthesis (37 digital/analog engines)', 'Síntesis híbrida (37 motores digitales/analógicos)');

// 5. Digitakt II: add compressor + overdrive
fix('Effects', 'Elektron Digitakt II', 'Delay, reverb, chorus, bitcrush, compressor, overdrive', 'Delay, reverb, chorus, bitcrush, compresor, overdrive');

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
