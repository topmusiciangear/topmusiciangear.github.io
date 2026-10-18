const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const us = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_US.json', 'utf8'));
const precioUS = {};
(us.productos || []).forEach(p => { if (p.precio && p.precio.simbolo === '$') precioUS[p.id] = p.precio.valor.toFixed(2); });

const ruta = B + 'build-guides.js';
const lineas = fs.readFileSync(ruta, 'utf8').split('\n');
let arreglados = 0, otros = [];

const salida = lineas.map(l => {
  const m = l.match(/^(\s*)(\d+):\s*(\{prices:\{[\s\S]*)$/);
  if (!m) return l;
  const [, sp, id, resto] = m;
  if (resto.indexOf('pbCur:') < 0) return l;
  if (!precioUS[id]) return l;

  // conserva el bloque prices y reconstruye pbCur con comillas correctas
  const p = resto.match(/^(\{prices:\{[\s\S]*?\},)(\s*)pbCur:\{[\s\S]*$/);
  if (!p) return l;
  // recupera el uk actual (puede estar intacto)
  const ukMatch = resto.match(/uk:\s*"\u00A3([\d.,]+)"/);
  const uk = ukMatch ? '\u00A3' + ukMatch[1] : '"\u00A30.00"';
  const nueva = sp + id + ': ' + p[1] + 'pbCur:{us:"$' + precioUS[id] + '",uk:"' + uk + '"}}';
  if (nueva !== l) arreglados++;
  return nueva;
});

fs.writeFileSync(ruta, salida.join('\n'), 'utf8');
console.log('lineas reconstruidas: ' + arreglados);

// verificacion
const s = fs.readFileSync(ruta, 'utf8').split('\n');
let malas = 0, ok = 0;
s.forEach(l => {
  const m = l.match(/^\s*(\d+):\s*(\{prices:\{[\s\S]*)$/);
  if (!m || m[2].indexOf('pbCur:') < 0) return;
  const a = (l.match(/\{/g) || []).length, c = (l.match(/\}/g) || []).length;
  if (a !== c) { malas++; console.log('DESBAL ' + m[1]); return; }
  const usm = l.match(/us:"\$([\d.,]+)"/);
  if (usm && precioUS[m[1]] && usm[1] === precioUS[m[1]]) ok++;
  else { malas++; console.log('  US incorrecto ' + m[1] + ': ' + (usm ? usm[1] : 'sin us') + ' vs ' + precioUS[m[1]]); }
});
console.log('US correctos: ' + ok + ' | problemas: ' + malas);
[1003, 1004, 1019, 1034].forEach(id => {
  const mm = s.join('\n').match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  ' + id + ': ' + (mm ? mm[0].replace(/^\n/, '').trim() : 'NO'));
});