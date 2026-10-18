const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const ruta = B + 'build-guides.js';
let s = fs.readFileSync(ruta, 'utf8');
const lineas = s.split('\n');
let reparadas = 0, tocadas = [];
const salida = lineas.map(l => {
  // una entrada del mapa debe acabar en '}},' (pbCur + entrada), nunca en '}}}},'
  if (/^\s*\d+: \{prices:\{[\s\S]*\}\}\},?$/.test(l)) {
    reparadas++;
    tocadas.push(l.match(/^\s*(\d+):/)[1]);
    return l.replace(/\}\}\},?$/, '}},');
  }
  return l;
});
s = salida.join('\n');
fs.writeFileSync(ruta, s, 'utf8');
console.log('lineas reparadas: ' + reparadas + (tocadas.length ? ' -> ids ' + tocadas.join(', ') : ''));

// validar sintaxis de todo el fichero
try {
  new Function('return ' + s.slice(s.indexOf('const TEST_SHOP_BTN = {'), s.indexOf('const TEST_SHOP_BTN = {') + 400000).replace(/^const TEST_SHOP_BTN = /, '').replace(/;\s*$/, ''));
  console.log('TEST_SHOP_BTN: sintaxis del objeto OK');
} catch (e) {
  console.log('ERROR de sintaxis: ' + e.message);
}

// comprobar las entradas tocadas
[1001, 1036, 1005, 1019, 1021].forEach(id => {
  const m = s.match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  ' + id + ': ' + (m ? m[0].replace(/^\n/, '').trim() : 'NO'));
});