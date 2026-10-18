const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const gb = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_GB.json', 'utf8'));

const fmt = v => {
  const n = v.toFixed(2);
  const [i, d] = n.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + d;
};
const precioUK = {};
(gb.productos || []).forEach(p => { if (p.precio && p.precio.simbolo === '\u00A3') precioUK[p.id] = fmt(p.precio.valor); });

const ruta = B + 'build-guides.js';
const lineas = fs.readFileSync(ruta, 'utf8').split('\n');
let n = 0, saltados = [];

const salida = lineas.map(l => {
  const m = l.match(/^(\s*)(\d+):\s*(\{prices:\{[\s\S]*)$/);
  if (!m) return l;
  const [, sp, id, resto] = m;
  if (resto.indexOf('pbCur:') < 0 || !precioUK[id]) return l;
  const p = resto.match(/^(\{prices:\{[\s\S]*?\},)(\s*)pbCur:\{[\s\S]*$/);
  if (!p) { saltados.push(id); return l; }
  const usm = resto.match(/us:"\$([0-9.,]+)"/);
  const us = usm ? '$' + usm[1] : '"$0.00"';
  const nueva = sp + id + ': ' + p[1] + 'pbCur:{us:"' + us + '",uk:"\u00A3' + precioUK[id] + '"}},';
  if (nueva !== l) n++;
  return nueva;
});

fs.writeFileSync(ruta, salida.join('\n'), 'utf8');
console.log('pbCur.uk actualizados con precio REAL de UK: ' + n);
if (saltados.length) console.log('sin pbCur: ' + saltados.join(', '));