// verify_ws62_html.js — Verifica que el HTML generado de studio-subwoofers tiene el nombre restaurado
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let ok = true;
function chk(label, cond) {
  if (!cond) ok = false;
  console.log((cond ? 'OK   ' : 'FAIL ') + label);
}
function checkFile(file, isES) {
  const h = fs.readFileSync(B + file, 'utf8');
  console.log('--- ' + file + ' ---');
  const n = (h.match(/Kali Audio WS-6\.2/g) || []).length;
  console.log('   apariciones de "Kali Audio WS-6.2": ' + n);
  chk('tabla comparacion <th>Kali Audio WS-6.2</th>', h.includes('<th>Kali Audio WS-6.2</th>'));
  chk('sin <th> </th> vacio', !h.includes('<th> </th>'));
  if (!isES) {
    chk('heading seccion', h.includes('Kali Audio WS-6.2: Best for Canceling Cabinet Vibrations'));
    chk('contenido seccion', h.includes('The Kali Audio WS-6.2 is the compact sub'));
    chk('verdict span con nombre', h.includes('<span class="product-name">Kali Audio WS-6.2</span>'));
    chk('FAQ con nombre', h.includes('The Kali Audio WS-6.2 is the best budget studio subwoofer'));
    chk('FAQ T10S sin It suelto', h.includes('the Adam T10S is the more compact choice'));
    chk('sin "The is the compact" dañado', !h.includes('The is the compact'));
  } else {
    chk('heading seccion ES', h.includes('Kali Audio WS-6.2: mejor para cancelar vibraciones de la caja'));
    chk('contenido seccion ES', h.includes('El Kali Audio WS-6.2 es el sub compacto'));
    chk('FAQ ES con nombre', h.includes('El Kali Audio WS-6.2 es el mejor subwoofer de estudio económico'));
    chk('sin "El es el sub" dañado', !h.includes('El es el sub'));
  }
  chk('sin span de producto vacio en verdict', !h.includes('<span class="product-name"> </span>'));
}
checkFile('guides/studio-subwoofers.html', false);
checkFile('guides/studio-subwoofers_es.html', true);
console.log(ok ? '\nHTML VERIFICADO: TODO OK' : '\nHAY FALLOS EN EL HTML');
process.exit(ok ? 0 : 1);
