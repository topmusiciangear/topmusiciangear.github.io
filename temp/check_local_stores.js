const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('FLOW 8: What Six Faders');
if (idx > -1) {
  const section = h.slice(idx, idx + 12000);
  const stores = section.match(/data-store="[^"]+"/g);
  console.log('Local stores:', stores);
}