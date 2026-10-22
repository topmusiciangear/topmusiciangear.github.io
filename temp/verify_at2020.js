const fs = require('fs');
const en = fs.readFileSync('guides/at2020-vs-p120.html', 'utf8');
const es = fs.readFileSync('guides/at2020-vs-p120_es.html', 'utf8');

function has(h, s) { return h.indexOf(s) > -1; }
function count(h, re) { return (h.match(re) || []).length; }

const checks = [];
const add = (name, ok) => checks.push((ok ? 'OK  ' : 'FAIL') + ' ' + name);

add('ES heading nuevo', has(es, 'Entonces, \u00bfqu\u00e9 condensador para tu sala?'));
add('ES "tendr\u00e1s que comprar aparte"', has(es, 'tendr\u00e1s que comprar aparte'));
add('ES "patr\u00f3n bidireccional"', has(es, 'patr\u00f3n bidireccional'));
add('ES "parte trasera"', has(es, 'parte trasera: hay que estirar el brazo'));
add('EN "most close-miked amps"', has(en, 'most close-miked amps'));
add('EN "replacing one is easy"', has(en, 'replacing one is easy'));
add('EN sin "microfroneado"', !has(es, 'microfroneado'));
add('EN sin "El precio es aire"', !has(es, 'El precio es aire'));

add('EN 15 filas tabla', count(en, /<tr[ >]/g) >= 15);
const esRows = count(es, /<tr[ >]/g);
add('ES filas tabla >= 15 (' + esRows + ')', esRows >= 15);

const li = h => count(h, /<li>/g);
add('EN pros+cons 20 (5+5 x2)', li(en) === 20);
add('ES pros+cons 20 (5+5 x2)', li(es) === 20);
add('EN 2 listas pros', count(en, /verdict-pros-list/g) === 2);
add('ES 2 listas pros', count(es, /verdict-pros-list/g) === 2);
add('EN 2 listas cons', count(en, /verdict-cons-list/g) === 2);
add('ES 2 listas cons', count(es, /verdict-cons-list/g) === 2);

add('EN 0 href undefined', count(en, /href="undefined"/g) === 0);
add('ES 0 href undefined', count(es, /href="undefined"/g) === 0);
add('EN 0 NaN render', count(en, />[^<]*NaN[^<]*</g) === 0);
add('ES 0 NaN render', count(es, />[^<]*NaN[^<]*</g) === 0);

add('EN title correcto', has(en, '<title>Audio-Technica AT2020 vs AKG P120: Which Mic Wins?</title>'));
add('ES title correcto', has(es, '<title>Audio-Technica AT2020 vs AKG P120: \u00bfcu\u00e1l elegir?</title>'));

add('AT2020 card EN nuevo nombre', has(en, 'Audio-Technica AT2020 Studio Condenser Microphone'));
add('AT2020 card ES nuevo nombre', has(es, 'Micr\u00f3fono de condensador de estudio Audio-Technica AT2020'));

add('EN hreflang es', has(en, 'hreflang="es"'));
add('ES hreflang en', has(es, 'hreflang="en"'));

console.log(checks.join('\n'));
const fails = checks.filter(c => c.startsWith('FAIL'));
console.log('\n' + (fails.length ? fails.length + ' FALLOS' : 'TODO OK'));
