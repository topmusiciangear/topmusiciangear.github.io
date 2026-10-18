const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const s = fs.readFileSync(B + 'guides/best-home-studio-speakers.html', 'utf8')
  + fs.readFileSync(B + 'guides/best-home-studio-speakers_es.html', 'utf8');

console.log('=== PRECIOS POR TIENDA EN LA PAGINA ===');
// precios de los productos que ya tienen entrada en TEST_SHOP_BTN
const buscar = [
  ['PreSonus Eris 3.5 2nd Gen', ['\u00A381.50', '\u00A371.00', '\u20AC114.00', '$100.00']],
  ['Mackie CR4.5', ['\u00A3118.00', '\u20AC139.00', '$130.00']]
];
buscar.forEach(([nombre, precios]) => {
  console.log('\n  ' + nombre + ':');
  precios.forEach(p => {
    const n = (s.split(p).length - 1);
    console.log('    ' + p.padEnd(12) + (n > 0 ? 'aparece ' + n + 'x  OK' : '*** NO APARECE ***'));
  });
});

console.log('\n=== ENLACES DE TIENDA EN LA PAGINA ===');
const zz = [...new Set((s.match(/zzounds\.com\/item--[A-Z0-9-]+/g) || []))];
const an = [...new Set((s.match(/andertons\.co\.uk\/[a-z0-9-]+/g) || []))];
zz.forEach(u => console.log('  ' + u));
an.forEach(u => console.log('  ' + u));
console.log('  musicstore (art-REC...): ' + [...new Set((s.match(/art-REC\d+-000/g) || []))].join(', '));
console.log('  g4m sufijo /7IXR: ' + (s.includes('/7IXR') ? 'OK' : 'NO APARECE'));
console.log('  g4m sufijo /5S7N: ' + (s.includes('/5S7N') ? 'OK' : 'NO APARECE'));

const sinTag = (s.match(/https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}[^"\s<]*/g) || []).filter(u => !/tag=topmusicg-20/.test(u));
console.log('\n  enlaces amazon sin tag: ' + sinTag.length);
const conParams = (s.match(/href="[^"]*[?&](siid|_gl|gcl_aw)=[^"]*"/g) || []);
console.log('  enlaces con parametros de rastreo: ' + conParams.length);
conParams.slice(0, 3).forEach(u => console.log('    ! ' + u.slice(0, 90)));
