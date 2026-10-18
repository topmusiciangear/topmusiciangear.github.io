const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const scraped = JSON.parse(fs.readFileSync(B + 'temp/pb_eur_live.json', 'utf8'));
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

let cambios = 0, promos = [];
scraped.forEach(s => {
  if (!s.actual || s.moneda !== '\u20AC') return;
  const eur = parseFloat(s.actual.replace(/[^\d.]/g, '')).toFixed(2);
  const re = new RegExp('(\\n\\s*' + s.id + ': \\{prices:\\{pluginboutique:)"[^"]+"');
  const m = bg.match(re);
  if (!m) { console.log(s.id + ': entrada no localizada'); return; }
  const antes = parseFloat(m[0].match(/pluginboutique:"([\u20AC$£][\d.,]+)"/)[1].replace(/[^\d.]/g, ''));
  if (Math.abs(antes - parseFloat(eur)) < 0.005) return;
  bg = bg.replace(m[0], '\n' + m[0].replace(/pluginboutique:"[^"]+"/, 'pluginboutique:"\u20AC' + eur + '"'));
  cambios++;
  console.log('  ' + s.id + ' ' + String(s.title).slice(0, 34).padEnd(34) + ' \u20AC' + antes.toFixed(2) + ' -> \u20AC' + eur + (s.lista ? '   (PROMO, lista \u20AC' + s.lista.replace(/[^\d.]/g, '') + ')' : ''));
  if (s.lista) promos.push({ id: s.id, eur: eur, lista: s.lista.replace(/[^\d.]/g, '') });
});
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('\nprecios EU actualizados a valor real de PB: ' + cambios);
console.log('\n--- en promo (recuperar lista al vencer) ---');
promos.forEach(p => console.log('  ' + p.id + ': \u20AC' + p.eur + ' (lista \u20AC' + p.lista + ')'));