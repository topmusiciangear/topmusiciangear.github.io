const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function refs(file) {
  const c = fs.readFileSync(BASE + file, 'utf8');
  const out = [];
  const re = /(?:src|href)\s*=\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(c)) !== null) {
    const u = m[1];
    if (/^(#|mailto:|tel:|data:|javascript:)/i.test(u)) continue;
    if (!/\.(js|css|jpg|jpeg|png|webp|svg|ico|woff2?)(\?|$)/i.test(u)) continue;
    out.push(u);
  }
  return out;
}

function classify(file, u) {
  // donde resuelve realmente
  const dir = file.indexOf('/') > -1 ? file.split('/').slice(0, -1).join('/') : '';
  let resolved;
  if (u.charAt(0) === '/') resolved = u.split('?')[0].replace(/^\//, '');
  else resolved = (dir ? dir + '/' : '') + u.split('?')[0];
  return { url: u, resolved: resolved, exists: fs.existsSync(BASE + resolved) };
}

['index.html', 'es/index.html'].forEach(function (f) {
  console.log('=== ' + f + ' ===');
  const r = refs(f);
  const bad = [];
  r.forEach(function (u) {
    const c = classify(f, u);
    if (!c.exists) bad.push(c);
  });
  console.log('  referencias a ficheros: ' + r.length);
  console.log('  ROTAS: ' + bad.length);
  bad.forEach(function (b) { console.log('    X ' + b.url.padEnd(52) + ' -> ' + b.resolved + '   (NO EXISTE)'); });
  console.log('');
});

console.log('=== comprobacion manual: existe /js/ en la raiz? ===');
console.log('  js/translations.v4.min.js : ' + fs.existsSync(BASE + 'js/translations.v4.min.js'));
console.log('  es/js/translations.v4.min.js: ' + fs.existsSync(BASE + 'es/js/translations.v4.min.js'));
console.log('  js/app.min.js             : ' + fs.existsSync(BASE + 'js/app.min.js'));

console.log('\n=== CSS en es/index.html ===');
const c = fs.readFileSync(BASE + 'es/index.html', 'utf8');
(c.match(/<link[^>]*stylesheet[^>]*>/gi) || []).forEach(function (l) {
  const u = (l.match(/href="([^"]+)"/) || [])[1];
  const resolved = u.charAt(0) === '/' ? u.slice(1).split('?')[0] : 'es/' + u.split('?')[0];
  console.log('  ' + u.padEnd(34) + ' -> ' + resolved + '  ' + (fs.existsSync(BASE + resolved) ? 'OK' : '[!!] NO EXISTE'));
});