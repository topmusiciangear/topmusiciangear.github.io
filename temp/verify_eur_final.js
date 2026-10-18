const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const scraped = JSON.parse(fs.readFileSync(B + 'temp/pb_eur_live.json', 'utf8'));
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let mal = 0;
scraped.forEach(s => {
  if (!s.actual || s.moneda !== '\u20AC') return;
  const eur = parseFloat(s.actual.replace(/[^\d.]/g, '')).toFixed(2);
  const m = bg.match(new RegExp('(?:^|\\n)\\s*' + s.id + ': \\{prices:\\{pluginboutique:"([^"]+)"'));
  const actual = m ? m[1].replace(/[^\d.]/g, '') : '?';
  const ok = Math.abs(parseFloat(actual) - parseFloat(eur)) < 0.005;
  if (!ok) { mal++; console.log('  ' + s.id + ' ' + String(s.title).slice(0, 34) + ' mapa=' + actual + ' PB real=' + eur); }
});
console.log('precios EU del mapa distintos de PB: ' + mal + ' de ' + scraped.length);
// sintaxis de shop-buttons
try { new Function(fs.readFileSync(B + 'js/shop-buttons.js', 'utf8')); console.log('shop-buttons.js OK'); } catch (e) { console.log('shop-buttons.js ERROR: ' + e.message); }
// muestra de 6 entradas
[1002, 1005, 1036, 1039, 1019, 1021].forEach(id => {
  const m = bg.match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  ' + m[0].replace(/^\n/, '').trim());
});