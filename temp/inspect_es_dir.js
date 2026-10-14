const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

console.log('=== es/index.html: contexto del footer ===');
const e = fs.readFileSync(BASE + 'es/index.html', 'utf8');
const i = e.indexOf('All rights reserved');
console.log(e.substr(Math.max(0, i - 620), 900).replace(/\s+/g, ' '));

console.log('\n=== es/index.html usa data-i18n? ===');
console.log('  ocurrencias de data-i18n: ' + (e.match(/data-i18n/g) || []).length);
console.log('  carga translations.v4.min.js? ' + /translations\.v4\.min\.js/.test(e));

console.log('\n=== los otros 5 ficheros ES: contexto ===');
['es/affiliate-disclosure.html', 'es/contact.html', 'es/cookie-policy.html', 'es/privacy-policy.html', 'es/terms.html'].forEach(function (f) {
  const c = fs.readFileSync(BASE + f, 'utf8');
  const j = c.indexOf('All rights reserved');
  console.log('\n--- ' + f + ' ---');
  console.log(c.substr(Math.max(0, j - 170), 300).replace(/\s+/g, ' '));
});

console.log('\n=== contraste con las versiones EN ===');
['affiliate-disclosure.html', 'contact.html', 'cookie-policy.html', 'privacy-policy.html', 'terms.html'].forEach(function (f) {
  const c = fs.readFileSync(BASE + f, 'utf8');
  const j = c.indexOf('All rights reserved');
  console.log('--- ' + f + ' --- ' + (j > -1 ? c.substr(Math.max(0, j - 120), 220).replace(/\s+/g, ' ') : 'no encontrado'));
});