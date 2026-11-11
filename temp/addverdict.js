const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
const needle = '<p><strong><span class="product-name">Zynaptiq Unveil</span></strong> — De-mixing-based de-reverb processor. Surgical removal of room acoustics from recordings made in problematic spaces.</p>"';
const insert = '<p><strong><span class="product-name">Zynaptiq Unveil</span></strong> — De-mixing-based de-reverb processor. Surgical removal of room acoustics from recordings made in problematic spaces.</p><p><strong><span class="product-name">Waves Clarity Vx Pro</span></strong> — Real-time AI noise isolation for dialogue. Multi-band spectral cleaning without metallic artifacts.</p>"';
if (s.includes(needle)) {
  s = s.replace(needle, insert);
  fs.writeFileSync(p, s);
  console.log('done');
} else {
  console.log('target not found');
}
