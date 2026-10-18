const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const s = fs.readFileSync(B + 'guides/best-home-studio-speakers.html', 'utf8')
  + fs.readFileSync(B + 'guides/best-home-studio-speakers_es.html', 'utf8');

const asins = ['B08KXTJX16', 'B0DGXTBQTY', 'B00GP56OYA', 'B0DFZZ5ZZY', 'B016P9HJIA', 'B0DFZW2S9G'];
let dobles = 0;

console.log('=== ENLACES AMAZON EN EL HTML GENERADO ===');
asins.forEach(a => {
  const re = new RegExp('https://www\\.amazon\\.com/dp/' + a + '[^"\\s<]*', 'g');
  const m = s.match(re) || [];
  const conDoble = m.filter(u => (u.match(/tag=topmusicg-20/g) || []).length > 1);
  if (conDoble.length) { dobles++; console.log('  DOBLE TAG  ' + a + ' -> ' + conDoble[0]); }
  else console.log('  OK         ' + a + '  (' + m.length + ')' + (m[0] ? '  ' + m[0] : '   NO APARECE'));
});

const todos = s.match(/https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}[^"\s<]*/g) || [];
const sinTag = todos.filter(u => !/tag=topmusicg-20/.test(u));
const conParams = todos.filter(u => /[?&](siid|sr|rdr|search_query|psc|th|ref_)=/i.test(u));

console.log('\ntotal enlaces amazon /dp/ en la pagina: ' + todos.length);
console.log('sin tag=topmusicg-20: ' + sinTag.length);
sinTag.slice(0, 5).forEach(u => console.log('   ! ' + u));
console.log('con parametros de sesion: ' + conParams.length);
conParams.slice(0, 5).forEach(u => console.log('   ! ' + u));
console.log('dobles tag: ' + dobles);

// enlaces de tiendas de los 7 productos en la pagina
const g4m = [...new Set(s.match(/awin1\.com\/cread\.php\?awinmid=1117[^"\s<]*/g) || [])];
console.log('\nenlaces Gear4Music (awin) distintos: ' + g4m.length);
g4m.slice(0, 3).forEach(u => console.log('   ' + decodeURIComponent(u).slice(0, 110)));

// enlaces internos de la guia
const internos = [...new Set(s.match(/href="(\/[^"]*best-[^"]*)"/g) || [])];
console.log('\nenlaces internos que apuntan a otra guia: ' + internos.length);
internos.slice(0, 10).forEach(u => console.log('   ' + u));
