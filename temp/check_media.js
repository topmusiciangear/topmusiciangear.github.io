const fs = require('fs');
const b = fs.readFileSync('guides/guitar-bass-amps.html', 'utf8');
function secHasMediabuy(marker) {
  const i = b.indexOf(marker);
  if (i < 0) return 'MARKER NOT FOUND: ' + marker;
  const end = b.indexOf('<h2', i + 10);
  const slice = b.slice(i, end > 0 ? end : i + 6000);
  return slice.includes('guide-section-mediabuy');
}
console.log('tematica Tube (sin mediabuy esperado=true):', !secHasMediabuy('Tube vs Solid-State vs Modeling'));
console.log('tematica Bass (sin mediabuy esperado=true):', !secHasMediabuy('Bass Amps: What You Actually Need'));
console.log('dedicada THR10II (con mediabuy esperado=true):', secHasMediabuy('Yamaha THR10II: The Amp That Lives in Your Room'));
console.log('dedicada RB-210 (con mediabuy esperado=true):', secHasMediabuy('Ampeg Rocket Bass RB-210: 500 Watts of SVT DNA'));
