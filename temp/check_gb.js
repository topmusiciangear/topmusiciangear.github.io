const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const gb = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_GB.json', 'utf8'));
const conUK = new Set((gb.productos || []).filter(p => p.precio && p.precio.simbolo === '\u00A3').map(p => p.id));
const s = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const faltan = [];
conUK.forEach(id => {
  const i = s.indexOf(id + ': {prices:{');
  if (i < 0) { faltan.push(id + ' (no esta en el mapa)'); return; }
  const linea = s.slice(i, s.indexOf('\n', i));
  const esperado = (gb.productos.find(p => p.id === id).precio.valor.toFixed(2));
  const m = linea.match(/uk:"\u00A3([\d.,]+)"/);
  if (!m || m[1].replace(/,/g, '') !== esperado) faltan.push(id + ' uk=' + (m ? m[1] : 'n/a') + ' esperado=' + esperado);
});
console.log('UK en el mapa: ' + (conUK.size - faltan.length) + '/' + conUK.size);
if (faltan.length) console.log('faltan:\n  ' + faltan.join('\n  '));