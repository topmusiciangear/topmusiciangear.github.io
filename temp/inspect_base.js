const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const es = fs.readFileSync(BASE + 'es/index.html', 'utf8');

console.log('=== <base href> en es/index.html? ===');
const b = es.match(/<base[^>]*>/i);
console.log('  ' + (b ? b[0] : 'NO HAY <base> -> por eso todo lo relativo se resuelve contra /es/'));

console.log('\n=== <head> ===');
const head = es.match(/<head[\s\S]*?<\/head>/i);
console.log(head[0].replace(/\s+/g, ' ').slice(0, 700));

console.log('\n=== enlaces internos: absolutos o relativos? ===');
const links = (es.match(/href="([^"]+)"/gi) || []).map(x => (x.match(/"([^"]+)"/) || [])[1])
  .filter(u => !/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(u));
const rel = links.filter(u => u.charAt(0) !== '/');
console.log('  enlaces internos totales: ' + links.length);
console.log('  con barra inicial (absolutos): ' + links.filter(u => u.charAt(0) === '/').length);
console.log('  RELATIVOS (afectados por <base>): ' + rel.length);
Array.from(new Set(rel)).slice(0, 20).forEach(u => console.log('      ' + u));

console.log('\n=== los otros 5 ficheros ES: tienen rutas rotas? ===');
['es/affiliate-disclosure.html', 'es/contact.html', 'es/cookie-policy.html', 'es/privacy-policy.html', 'es/terms.html'].forEach(function (f) {
  const c = fs.readFileSync(BASE + f, 'utf8');
  const ls = (c.match(/href="([^"]+)"/gi) || []).map(x => (x.match(/"([^"]+)"/) || [])[1])
    .filter(u => !/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(u));
  const rels = ls.filter(u => u.charAt(0) !== '/');
  const imgs = (c.match(/src="([^"]+)"/gi) || []).map(x => (x.match(/"([^"]+)"/) || [])[1])
    .filter(u => u.charAt(0) !== '/' && !/^https?:/i.test(u));
  console.log('  ' + f.replace('es/', '') + ': <base>=' + (/<base/i.test(c) ? 'si' : 'NO') +
    '  enlaces relativos=' + rels.length + '  src relativos=' + imgs.length);
  Array.from(new Set(rels)).slice(0, 5).forEach(u => console.log('      ' + u));
});

console.log('\n=== CSS de las paginas ES estaticas: como lo referencian? ===');
['es/contact.html', 'es/terms.html'].forEach(function (f) {
  const c = fs.readFileSync(BASE + f, 'utf8');
  (c.match(/<link[^>]*stylesheet[^>]*>/gi) || []).forEach(function (l) {
    console.log('  ' + f.replace('es/', '') + ': ' + (l.match(/href="([^"]+)"/) || [])[1]);
  });
});