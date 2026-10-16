const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const t = JSON.stringify(JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8')).find(x => x.id === 'starter-studio'));
const patrones = ['tiers de esta', 'potencienciador', 'depurar', 'explosivas', 'empastre', 'escurrido', 'pajas',
  'cuadruple de conductor', 'se cancela a sí misma', 'Absórbelos', 'losELO', 'pulgadasCulpa', 'dB-A',
  'adaptador DIN', 'float de 32 bits', '32 bits float', 'en lugar de con ', 'sobrevivible',
  'El circuitry', 'compingando', 'Pairéalo', 'desaparecen primero', 'Diez centímetros', 'Ten centimetres',
  '6110', 'Doppler', 'una rediseño'];
let total = 0;
patrones.forEach(re => {
  const c = (t.match(new RegExp(re, 'g')) || []).length;
  if (c) { total += c; console.log('  ' + String(c).padStart(3) + '  ' + re); }
});
console.log('\nTOTAL residuos historicos: ' + total);
const d = fs.readFileSync(B + 'guides/starter-studio_es.html', 'utf8');
console.log('mojibake ES: ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
console.log('veredictos 4+4: ' + d.split('<div class="verdict-product-name">').length);
const e = fs.readFileSync(B + 'guides/starter-studio.html', 'utf8');
console.log('mojibake EN: ' + (e.match(/â‚¬|Â£|Â°/g) || []).length);
