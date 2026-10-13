const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'usb-mics');
const row = g.productTable.rows.find(r => r.label === 'Dynamic Range');
const cur = row.values[1];
if (cur.value === '95 dB (115 dB with Clipguard)') {
  row.values[1] = { value: 'Not published', value_es: 'No publicado' };
  fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
  console.log('Wave:3 Dynamic Range: "95 dB (115 dB con Clipguard)" -> "Not published"');
  console.log('  Razon: venia de la misma ficha antigua que decia 120/140 dB max SPL.');
  console.log('          Elgato publica ahora 130 dB max SPL y no publica rango dinamico.');
} else {
  console.log('Valor actual distinto, sin cambio: ' + JSON.stringify(cur));
}