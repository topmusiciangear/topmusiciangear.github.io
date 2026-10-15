const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/temp/tabla_nueva.js';
let s = fs.readFileSync(p, 'utf8');

// 1) EN: palabra inventada + ES partido con basura
s = s.replace(
  "col('The one who wants a finished studio with real speakers without remortgating their savings.',\n        'El que quiere un estudio terminado con altavoces de verdad sin-+\n        'remortajar sus ahorros.'),",
  "col('The one who wants a finished studio with real speakers without remortgating every saving.',\n        'El que quiere un estudio terminado con altavoces de verdad sin rematar cada ahorro.'),"
);

// 2) barra suelta
s = s.replace('pasar a|altavoces', 'pasar a altavoces');

fs.writeFileSync(p, s, 'utf8');
console.log('corrupciones corregidas');

// volver a buscar
['-+', 'a|', '|a', 'remortgating', 'remortajar'].forEach(x => {
  const n = (s.match(new RegExp(x.replace(/[-[\]{}()*+?.\\^$|]/g, '\\$&'), 'g')) || []).length;
  console.log('  ' + (n ? 'RESTA ' + n : 'limpio') + '  "' + x + '"');
});
console.log('\nfrase EN: ' + (s.match(/'The one who wants[^']*'/) || [])[0]);
console.log('frase ES: ' + (s.match(/'El que quiere[^']*'/) || [])[0]);
const esf = s.match(/'El que quiere[^']*'/) || [''];
console.log('\nlongitud ES: ' + esf[0].length + 'c');
console.log('ES en una sola cadena?: ' + (s.indexOf('sin rematar cada ahorro') > -1));
try { new Function(s); console.log('sintaxis del script: OK'); } catch (e) { console.log('SINTAXIS ROTA: ' + e.message); }
