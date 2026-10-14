const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const log = [];

// Todas las paginas de /es/ llevan <base href="/">, asi que las rutas relativas
// resuelven desde la raiz del sitio. Ese tag es lo que hace que /es/ funcione.

// ============================================================
// 1) es/index.html: usa el mismo sistema data-i18n que la home EN
//    (carga translations.v4.min.js y define lang="es"), asi que basta con
//    envolver el copyright en data-i18n="footerCopyright".
// ============================================================
const ip = BASE + 'es/index.html';
let idx = fs.readFileSync(ip, 'utf8');
const OLD_P = '<p style="margin-top:8px;">&copy; 2026 TopMusicianGear. All rights reserved. <span data-i18n="footerTagline">Hecho por un músico, para músicos.</span></p>';
const NEW_P = '<p style="margin-top:8px;"><span data-i18n="footerCopyright">&copy; 2026 TopMusicianGear. Todos los derechos reservados.</span> <span data-i18n="footerTagline">Hecho por un músico, para músicos.</span></p>';
if (idx.indexOf(OLD_P) === -1) { console.log('[!!] es/index.html: no encuentro el <p> del copyright. Aborto.'); process.exit(1); }
idx = idx.replace(OLD_P, NEW_P);
fs.writeFileSync(ip, idx);
log.push('es/index.html: copyright ahora traducible (data-i18n="footerCopyright") con el texto ES por defecto');

// ============================================================
// 2) Las otras 5 paginas ES estaticas: NO cargan translations, asi que
//    van con texto fijo. Traducir directamente.
// ============================================================
const STATIC_ES = ['es/affiliate-disclosure.html', 'es/contact.html', 'es/cookie-policy.html', 'es/privacy-policy.html', 'es/terms.html'];
STATIC_ES.forEach(function (f) {
  const p = BASE + f;
  let c = fs.readFileSync(p, 'utf8');
  const b = c;
  c = c.split('&copy; 2026 TopMusicianGear. All rights reserved.').join('&copy; 2026 TopMusicianGear. Todos los derechos reservados.');
  c = c.split('Built by a musician, for musicians.').join('Hecho por un músico, para músicos.');
  if (c !== b) {
    fs.writeFileSync(p, c);
    log.push(f + ': copyright + tagline traducidos');
  }
});

// ============================================================
// VERIFICACION
// ============================================================
const fails = [];
const ck = (n, ok) => { if (!ok) fails.push(n); console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n); };

console.log('=== VERIFICACION ===');
const v4 = fs.readFileSync(BASE + 'js/translations.v4.min.js', 'utf8');
const esKey = (v4.match(/footerCopyright:"(\u00a9 2026 TopMusicianGear\. Todos los derechos reservados\.)"/) || [])[1];
const enKey = (v4.match(/footerCopyright:"(\u00a9 2026 TopMusicianGear\. All rights reserved\.)"/) || [])[1];
ck('clave ES existe en translations.v4.min.js', !!esKey);
ck('clave EN existe en translations.v4.min.js', !!enKey);

const ei = fs.readFileSync(ip, 'utf8');
ck('es/index.html usa data-i18n="footerCopyright"', ei.indexOf('data-i18n="footerCopyright"') > -1);
ck('es/index.html ya no tiene el copyright en ingles', ei.indexOf('All rights reserved') === -1);
ck('es/index.html mantiene <base href="/">', /<base href="\/">/.test(ei));

STATIC_ES.forEach(function (f) {
  const c = fs.readFileSync(BASE + f, 'utf8');
  ck(f + ' sin texto ingles', c.indexOf('All rights reserved') === -1 && c.indexOf('Built by a musician') === -1);
  ck(f + ' con texto español', c.indexOf('Todos los derechos reservados') > -1);
});

console.log('\n=== barrido final: ficheros .html con "All rights reserved" ===');
const found = [];
function walk(dir, depth) {
  if (depth > 2) return;
  fs.readdirSync(BASE + dir).forEach(function (e) {
    const rel = dir ? dir + '/' + e : e;
    if (e === 'node_modules' || e === '.git' || e === 'temp') return;
    const st = fs.statSync(BASE + rel);
    if (st.isDirectory()) return walk(rel, depth + 1);
    if (!e.endsWith('.html')) return;
    const c = fs.readFileSync(BASE + rel, 'utf8');
    if (c.indexOf('All rights reserved') > -1) found.push(rel);
  });
}
walk('', 0);
found.sort();
console.log('  ' + found.length + ' ficheros (deben ser SOLO los de idioma ingles):');
found.forEach(function (f) { console.log('      ' + f); });

const badEs = found.filter(function (f) { return /^es\//.test(f) || /_es\.html$/.test(f); });
ck('ninguno de ellos es una pagina en español', badEs.length === 0, badEs.join(', '));

console.log('\n=== como se vera ahora /es/ ===');
console.log('  ' + (ei.match(/data-i18n="footerCopyright">([^<]*)</) || [])[1] + ' ' +
  (ei.match(/data-i18n="footerTagline">([^<]*)</) || [])[1]);

if (fails.length) { console.log('\nABORTADO (' + fails.length + '):\n  ' + fails.join('\n  ')); process.exit(1); }

console.log('\nCAMBIOS (' + log.length + '):');
log.forEach(function (l) { console.log('  - ' + l); });