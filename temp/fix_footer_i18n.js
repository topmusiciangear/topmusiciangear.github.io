const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const log = [];

// ============================================================
// 1) deals_es.html: "All rights reserved." en ingles en una pagina ES
//    (build-guides.js ya lo hace bien con 'Todos los derechos reservados.')
// ============================================================
const dp = BASE + 'deals_es.html';
let deals = fs.readFileSync(dp, 'utf8');
const before = deals;
deals = deals.replace('&copy; 2026 TopMusicianGear. All rights reserved.', '&copy; 2026 TopMusicianGear. Todos los derechos reservados.');
if (deals !== before) {
  fs.writeFileSync(dp, deals);
  log.push('deals_es.html: "All rights reserved." -> "Todos los derechos reservados."');
}

// sanity: deals.html (EN) NO debe tocarse
const en = fs.readFileSync(BASE + 'deals.html', 'utf8');
if (en.indexOf('All rights reserved.') === -1) log.push('[!!] ALERTA deals.html EN perdio el texto ingles');
else log.push('deals.html (EN): "All rights reserved." intacto [OK]');

// ============================================================
// 2) index.html: el copyright esta FUERA del data-i18n, fijo en ingles.
//    El tagline si se traduce, por eso el ES queda a medias.
// ============================================================
const ip = BASE + 'index.html';
let idx = fs.readFileSync(ip, 'utf8');
const OLD_P = '<p style="margin-top:8px;">&copy; 2026 TopMusicianGear. All rights reserved. <span data-i18n="footerTagline">Built by a musician, for musicians.</span></p>';
const NEW_P = '<p style="margin-top:8px;"><span data-i18n="footerCopyright">&copy; 2026 TopMusicianGear. All rights reserved.</span> <span data-i18n="footerTagline">Built by a musician, for musicians.</span></p>';
if (idx.indexOf(OLD_P) === -1) { console.log('[!!] index.html: no encuentro el <p> del copyright. Aborto.'); process.exit(1); }
idx = idx.replace(OLD_P, NEW_P);
fs.writeFileSync(ip, idx);
log.push('index.html: copyright ahora es <span data-i18n="footerCopyright"> (traducible) en vez de texto fijo');

// ============================================================
// 3) translations.js (fuente legible): anadir footerCopyright EN + ES
// ============================================================
const tp = BASE + 'js/translations.js';
let tr = fs.readFileSync(tp, 'utf8');
if (tr.indexOf('footerCopyright') === -1) {
  // EN: junto a footerTagline en ingles
  const enTag = '  footerTagline: "Built by a musician, for musicians.",';
  if (tr.indexOf(enTag) === -1) { console.log('[!!] translations.js: no encuentro footerTagline EN. Aborto.'); process.exit(1); }
  tr = tr.replace(enTag, '  footerCopyright: "\u00a9 2026 TopMusicianGear. All rights reserved.",\n' + enTag);

  // ES: junto a su footerTagline
  const esTag = tr.match(/\s*footerTagline:\s*"Hecho por un m[^"]*",/);
  if (!esTag) { console.log('[!!] translations.js: no encuentro footerTagline ES. Aborto.'); process.exit(1); }
  tr = tr.replace(esTag[0], '\n  footerCopyright: "\u00a9 2026 TopMusicianGear. Todos los derechos reservados.",' + esTag[0]);

  fs.writeFileSync(tp, tr);
  log.push('js/translations.js: anadida clave footerCopyright en EN y ES');
}

// ============================================================
// 4) translations.v4.min.js (el que carga index.html): anadir la clave
// ============================================================
const vp = BASE + 'js/translations.v4.min.js';
let v4 = fs.readFileSync(vp, 'utf8');
if (v4.indexOf('footerCopyright') === -1) {
  const enTagV4 = 'footerTagline:"Built by a musician, for musicians."';
  if (v4.indexOf(enTagV4) === -1) { console.log('[!!] v4.min: no encuentro footerTagline EN. Aborto.'); process.exit(1); }
  v4 = v4.replace(enTagV4, 'footerCopyright:"\u00a9 2026 TopMusicianGear. All rights reserved.",' + enTagV4);

  const m = v4.match(/footerTagline:"Hecho por un m[^"]*"/);
  if (!m) { console.log('[!!] v4.min: no encuentro footerTagline ES. Aborto.'); process.exit(1); }
  v4 = v4.replace(m[0], 'footerCopyright:"\u00a9 2026 TopMusicianGear. Todos los derechos reservados.",' + m[0]);

  fs.writeFileSync(vp, v4);
  log.push('js/translations.v4.min.js: anadida clave footerCopyright en EN y ES');
}

// ============================================================
// 5) VERIFICACION
// ============================================================
const fails = [];
const chk = (n, ok) => { if (!ok) fails.push(n); console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n); };

console.log('\n=== VERIFICACION ===');
const idx2 = fs.readFileSync(ip, 'utf8');
chk('index.html tiene data-i18n="footerCopyright"', idx2.indexOf('data-i18n="footerCopyright"') > -1);
chk('index.html conserva el texto EN por defecto', idx2.indexOf('All rights reserved.') > -1);

const tr2 = fs.readFileSync(tp, 'utf8');
chk('translations.js EN tiene la clave', /footerCopyright:\s*"\u00a9 2026 TopMusicianGear\. All rights reserved\."/.test(tr2));
chk('translations.js ES tiene "Todos los derechos reservados"', /footerCopyright:\s*"\u00a9 2026 TopMusicianGear\. Todos los derechos reservados\."/.test(tr2));

const v42 = fs.readFileSync(vp, 'utf8');
chk('v4.min tiene la clave EN', /footerCopyright:"\u00a9 2026 TopMusicianGear\. All rights reservados?/.test(v42));
chk('v4.min tiene la clave ES', v42.indexOf('Todos los derechos reservados') > -1);
try { new (require('vm').Script)(v42); chk('v4.min sintaxis JS valida', true); } catch (e) { chk('v4.min sintaxis JS valida -> ' + e.message, false); }

const de = fs.readFileSync(dp, 'utf8');
chk('deals_es.html ya no tiene "All rights reserved"', de.indexOf('All rights reserved.') === -1);
chk('deals_es.html tiene "Todos los derechos reservados"', de.indexOf('Todos los derechos reservados.') > -1);
chk('deals.html EN conserva "All rights reserved"', fs.readFileSync(BASE + 'deals.html', 'utf8').indexOf('All rights reserved.') > -1);

// ============================================================
// 6) SIMULAR la traduccion: comprobar que la clave ES sustituye bien
// ============================================================
console.log('\n=== SIMULACION del render ES ===');
const mEn = v42.match(/footerCopyright:"([^"]*)"/);
const mEs = v42.match(/footerCopyright:"([^"]*)"/g);
console.log('  EN -> ' + (mEn ? mEn[1] : '?'));
console.log('  ES -> ' + (mEs && mEs[1] ? mEs[1].replace('footerCopyright:"', '').replace('"', '') : '?'));

//asi quedaria el footer en espanol:
const tagEs = (v42.match(/footerTagline:"(Hecho por un m[^"]*)"/) || [])[1];
const copyEs = (v42.match(/footerCopyright:"(\u00a9 2026 TopMusicianGear\. Todos los derechos reservados\.)"/) || [])[1];
console.log('\n  Footer ES simulado: "' + (copyEs || '?') + ' ' + (tagEs || '?') + '"');

if (fails.length) { console.log('\nABORTADO (' + fails.length + '): ' + fails.join(' | ')); process.exit(1); }

console.log('\nCAMBIOS (' + log.length + '):');
log.forEach(function (l) { console.log('  - ' + l); });
console.log('\nRecordatorio: falta correr _update_v4hash.js para el hash de cache de v4.min.js');