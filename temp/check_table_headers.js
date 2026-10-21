const fs = require('fs');
const s = fs.readFileSync('guides/monitor-setup.html', 'utf8');

// encabezados de seccion
const re = /<h2[^>]*class="[^"]*guide-section-heading[^"]*"[^>]*>([\s\S]*?)<\/h2>/g;
let m, i = 0;
while ((m = re.exec(s))) console.log((i++) + '. ' + m[1].replace(/<[^>]+>/g, '').trim());

// cabeceras de la tabla comparativa
const t = s.indexOf('<table class="guide-comp-table"');
const theadEnd = s.indexOf('</thead>', t);
const thead = s.slice(t, theadEnd);
console.log('\nCABECERAS:');
const reTh = /<th>([\s\S]*?)<\/th>/g;
let th;
while ((th = reTh.exec(thead))) console.log('  ' + th[1].replace(/<[^>]+>/g, '').trim());

// donde aparece "(Each)" y "(Pair)" en la pagina
console.log('\nOcurrencias "(Each)":', (s.match(/\(Each\)/g) || []).length);
console.log('Ocurrencias "(Pair)":', (s.match(/\(Pair\)/g) || []).length);
const j = s.indexOf('(Each)');
console.log('contexto (Each):', s.slice(j - 140, j + 60).replace(/</g, ' <'));
