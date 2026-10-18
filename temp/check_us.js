const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const s = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const us = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_US.json', 'utf8'));
let ok = 0, bad = [], total = 0;
us.productos.forEach(p => {
  if (!p.precio || p.precio.simbolo !== '$') return;
  total++;
  const esperado = p.precio.valor.toFixed(2);
  const idx = s.indexOf(p.id + ': {prices:{');
  if (idx < 0) { bad.push(p.id + ': no esta'); return; }
  const linea = s.slice(idx, s.indexOf('\n', idx));
  const m = linea.match(/us:"\$([0-9.,]+)"/);
  const got = m ? m[1].replace(/,/g, '') : null;
  if (got === esperado) ok++; else bad.push(p.id + ': ' + got + ' != ' + esperado);
});
console.log('USD reales en el mapa: ' + ok + '/' + total);
if (bad.length) console.log('fallos:\n  ' + bad.join('\n  '));