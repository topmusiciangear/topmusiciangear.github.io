const fs = require('fs');
const gFile = 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const gd = G.find(x => x.id === 'best-digital-pianos');
const H = {
  ultra: { en: 'Best Ultra-Compact Digital Pianos', es: 'Los mejores pianos digitales ultracompactos' },
  mid: { en: 'Best Mid-Range Portable Digital Pianos', es: 'Los mejores pianos portátiles de gama media' },
  console: { en: 'Best Console Digital Pianos with Furniture', es: 'Los mejores pianos digitales de mueble para casa' }
};
let n = 0;
gd.sections.forEach(s => {
  if (!(s.products || []).length) return;
  if (/Ultra-Compact/.test(s.heading)) { s.heading = H.ultra.en; s.heading_es = H.ultra.es; n++; }
  else if (/Mid-Range/.test(s.heading)) { s.heading = H.mid.en; s.heading_es = H.mid.es; n++; }
  else if (/Console Digital Pianos with Furniture/.test(s.heading)) { s.heading = H.console.en; s.heading_es = H.console.es; n++; }
});
if (n !== 3) throw new Error('expected 3, got ' + n);
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('headings reverted:', n);
// confirm H1 untouched
console.log('H1:', gd.title, '|', gd.title_es);
