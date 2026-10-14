const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const v4 = fs.readFileSync(BASE + 'js/translations.v4.min.js', 'utf8');
console.log('=== claves footer* en js/translations.v4.min.js (la que carga index.html) ===');
['footerDisclosureText', 'footerTagline', 'footerCopyright', 'copyright'].forEach(function (k) {
  const re = new RegExp(k + '\\s*:\\s*("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')');
  const m = v4.match(re);
  console.log('  ' + k.padEnd(24) + (m ? m[1].slice(0, 130) : 'NO EXISTE'));
});

console.log('\n=== como se ve el bloque EN completo ===');
const i = v4.indexOf('footerTagline');
console.log(JSON.stringify(v4.substring(Math.max(0, i - 300), 420)));

console.log('\n=== translations.js (fuente legible) linea de footerTagline ===');
const src = fs.readFileSync(BASE + 'js/translations.js', 'utf8');
src.split('\n').forEach(function (l, n) {
  if (/footerTagline|footerDisclosure/.test(l)) console.log('  L' + (n + 1) + ': ' + l.trim().slice(0, 140));
});

console.log('\n=== como aplica el i18n index.html ===');
const idx = fs.readFileSync(BASE + 'index.html', 'utf8');
const m = idx.match(/[^\n]{0,200}data-i18n[^\n]{0,300}/g) || [];
console.log(m.slice(0, 4).map(x => '  ' + x.trim().slice(0, 240)).join('\n'));

console.log('\n=== el applyI18n: busca data-i18n ===');
const lines = src.split('\n');
lines.forEach(function (l, n) {
  if (/data-i18n|applyI18n|setLang/.test(l)) console.log('  L' + (n + 1) + ': ' + l.trim().slice(0, 160));
});