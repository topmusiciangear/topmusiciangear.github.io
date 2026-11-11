const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
// Fix unescaped quotes in verdict
s = s.replace(
  '<p><strong><span class="product-name">Waves Clarity Vx Pro</span></strong> — Real-time AI noise isolation for dialogue. Multi-band spectral cleaning without metallic artifacts.</p>"',
  '<p><strong><span class=\\"product-name\\">Waves Clarity Vx Pro</span></strong> — Real-time AI noise isolation for dialogue. Multi-band spectral cleaning without metallic artifacts.</p>"'
);
fs.writeFileSync(p, s);
console.log('done');
