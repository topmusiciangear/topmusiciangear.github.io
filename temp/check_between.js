const fs = require('fs');
const h = fs.readFileSync('guides/stream-controllers.html', 'utf8');
const lastSec = h.lastIndexOf('<div class="guide-section">');
const conc = h.indexOf('Conclusion');
console.log('last section:', lastSec);
console.log('conclusion:', conc);
console.log('gap:', conc - lastSec);
if (conc > lastSec) {
  const between = h.slice(lastSec, conc);
  const pc = between.indexOf('guide-product-card');
  if (pc > -1) console.log('product card en between:', pc, between.slice(pc, pc + 500));
  else console.log('NO product card en between');
}