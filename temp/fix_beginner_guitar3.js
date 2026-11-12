const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// Fix ES: tocará mejor → sonará mejor, and -300 → $200–$300
const old1 = 'Una guitarra de -300 con ajuste profesional tocará mejor que una recién sacada de la caja.';
const new1 = 'Una guitarra de $200–$300 con ajuste profesional sonará mejor que una recién sacada de la caja.';
if (t.includes(old1)) {
  t = t.split(old1).join(new1);
  console.log('Fix 1: tocará mejor → sonará mejor + A -300 → A $200–$300');
} else {
  console.log('NOT FOUND. Searching for partial...');
  const idx = t.indexOf('tocará mejor');
  if (idx >= 0) console.log(t.slice(idx - 80, idx + 60));
}

try { JSON.parse(t); console.log('JSON parse OK'); } catch (e) { console.error('JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('data/guides.json actualizado');
