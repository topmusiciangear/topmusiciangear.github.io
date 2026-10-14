const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

console.log('=== scripts que referencian los ficheros de /es/ ===');
['es/index.html', 'es/contact.html', 'es/terms.html', 'es/privacy-policy.html', 'es/cookie-policy.html', 'es/affiliate-disclosure.html'].forEach(function (f) {
  const c = fs.readFileSync(BASE + f, 'utf8');
  const srcs = (c.match(/<(?:script|link)[^>]*(?:src|href)="([^"]+)"/gi) || [])
    .map(x => (x.match(/"([^"]+)"/) || [])[1])
    .filter(u => /translations|app\.js|shop-buttons|style\.css|\.js|\.css/.test(u));
  console.log('  ' + f.replace('es/', '') + ':');
  srcs.forEach(u => console.log('      ' + u));
});

console.log('\n=== ¿existe es/js/ o es/css/? ===');
console.log('  es/js  : ' + fs.existsSync(BASE + 'es/js'));
console.log('  es/css : ' + fs.existsSync(BASE + 'es/css'));

console.log('\n=== indice.html (EN) para comparar ===');
const en = fs.readFileSync(BASE + 'index.html', 'utf8');
const enSrcs = (en.match(/<(?:script|link)[^>]*(?:src|href)="([^"]+)"/gi) || [])
  .map(x => (x.match(/"([^"]+)"/) || [])[1])
  .filter(u => /translations|app\.js|shop-buttons|style\.css/.test(u));
enSrcs.forEach(u => console.log('  ' + u));

console.log('\n=== indice ES: fuerza el idioma? ===');
const esi = fs.readFileSync(BASE + 'es/index.html', 'utf8');
['var lang', 'localStorage.getItem', 'document.documentElement.lang'].forEach(function (k) {
  const i = esi.indexOf(k);
  console.log('  [' + k + '] ' + (i > -1 ? esi.substr(i, 120).replace(/\s+/g, ' ') : 'NO APARECE'));
});