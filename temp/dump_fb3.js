const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'fender-bass-guide');
const ti = g.productTable.columns.map(c => c.title);
['Fender Player II Precision Bass', 'Fender Player II Jazz Bass', 'Fender American Ultra II Precision Bass',
  "Squier Classic Vibe '60s Jazz Bass"].forEach(t => console.log(t + ' @ ' + ti.indexOf(t)));
['Frets & Fretboard', 'Active/Passive', 'Body Wood', 'Pickups', 'Neck', 'Electronics'].forEach(lab => {
  const r = g.productTable.rows.find(x => x.label === lab);
  console.log('\n[' + lab + ']');
  ti.forEach((t, i) => console.log('   ' + t + ' => "' + r.values[i].value + '" / ES "' + r.values[i].value_es + '"'));
});