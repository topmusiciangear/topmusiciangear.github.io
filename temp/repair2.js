const fs = require('fs');
const ruta = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
const lineas = fs.readFileSync(ruta, 'utf8').split('\n');
let reparadas = 0, ids = [];
const salida = lineas.map(l => {
  if (!/^\s*\d+: \{prices:\{/.test(l)) return l;
  const ab = (l.match(/\{/g) || []).length;
  const ce = (l.match(/\}/g) || []).length;
  if (ab === ce) return l;
  const exceso = ce - ab;
  if (exceso <= 0) return l;
  // quita el exceso de llaves de cierre justo antes de la coma final
  let nueva = l.replace(/\},?\s*$/, '');
  nueva = nueva.slice(0, nueva.length - exceso) + '},';
  reparadas++;
  ids.push(l.match(/^\s*(\d+):/)[1]);
  return nueva;
});
fs.writeFileSync(ruta, salida.join('\n'), 'utf8');
console.log('lineas rebalanceadas: ' + reparadas + (ids.length ? ' -> ' + ids.join(', ') : ''));

// verificacion: todas las entradas del mapa balanceadas
const s = fs.readFileSync(ruta, 'utf8').split('\n');
let malas = 0;
s.forEach(l => {
  if (!/^\s*\d+: \{prices:\{/.test(l)) return;
  const ab = (l.match(/\{/g) || []).length, ce = (l.match(/\}/g) || []).length;
  if (ab !== ce) { malas++; console.log('  DESBALANCEADA: ' + l.trim().slice(0, 110)); }
});
console.log('entradas desbalanceadas: ' + malas);