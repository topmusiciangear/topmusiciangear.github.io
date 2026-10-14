const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(46) + (extra || '')); };

const idx = fs.readFileSync(BASE + 'index.html', 'utf8');
const tr = fs.readFileSync(BASE + 'js/translations.js', 'utf8');
const v4 = fs.readFileSync(BASE + 'js/translations.v4.min.js', 'utf8');
const de = fs.readFileSync(BASE + 'deals_es.html', 'utf8');
const den = fs.readFileSync(BASE + 'deals.html', 'utf8');

console.log('=== index.html ===');
ck('data-i18n="footerCopyright"', idx.indexOf('data-i18n="footerCopyright"') > -1);
const p = idx.match(/<p style="margin-top:8px;"><span data-i18n="footerCopyright">[\s\S]{0,160}/);
console.log('       ' + (p ? p[0].replace(/\s+/g, ' ').slice(0, 150) : 'no encontrado'));

console.log('\n=== claves (v4.min = la que se carga) ===');
const enC = (v4.match(/footerCopyright:"(\u00a9 2026 TopMusicianGear\. All rights reserved\.)"/) || [])[1];
const esC = (v4.match(/footerCopyright:"(\u00a9 2026 TopMusicianGear\. Todos los derechos reservados\.)"/) || [])[1];
ck('EN = "All rights reserved."', !!enC, enC);
ck('ES = "Todos los derechos reservados."', !!esC, esC);
const enT = (v4.match(/footerTagline:"(Built by a musician[^"]*)"/) || [])[1];
const esT = (v4.match(/footerTagline:"(Hecho por un m[^"]*)"/) || [])[1];
ck('tagline EN sigue intacto', !!enT, enT);
ck('tagline ES sigue intacto', !!esT, esT);
ck('v4.min sintaxis valida', (() => { try { new (require('vm').Script)(v4); return true; } catch (e) { return e.message; } })() === true);

console.log('\n=== translations.js (fuente legible) ===');
ck('EN', /footerCopyright:\s*"\u00a9 2026 TopMusicianGear\. All rights reserved\."/.test(tr));
ck('ES', /footerCopyright:\s*"\u00a9 2026 TopMusicianGear\. Todos los derechos reservados\."/.test(tr));

console.log('\n=== deals ===');
ck('deals_es.html SIN "All rights reserved"', de.indexOf('All rights reserved.') === -1);
ck('deals_es.html CON "Todos los derechos reservados"', de.indexOf('Todos los derechos reservados.') > -1);
ck('deals.html EN INTACTO', den.indexOf('All rights reserved.') > -1);

console.log('\n=== footer ES final simulado ===');
console.log('  "' + esC + ' ' + esT + '"');
console.log('\n=== footer EN final simulado ===');
console.log('  "' + enC + ' ' + enT + '"');

console.log('\n=== barrido: queda "All rights reserved" en alguna pagina ES? ===');
const hits = [];
fs.readdirSync(BASE + 'guides').forEach(function (f) {
  if (!f.endsWith('.html')) return;
  const c = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  // las paginas ES son las _es.html
  if (/_es\.html$/.test(f) && /All rights reserved/.test(c)) hits.push(f);
});
ck('ninguna guia _es.html con texto ingles', hits.length === 0, hits.slice(0, 5).join(', '));

console.log('\n' + (fail === 0 ? 'TODAS LAS COMPROBACIONES OK' : 'FALLOS: ' + fail));
process.exit(fail === 0 ? 0 : 1);