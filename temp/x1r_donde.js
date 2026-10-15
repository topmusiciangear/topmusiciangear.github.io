const fs = require('fs'), path = require('path');
const raiz = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const reImg = /[^"' ]*260432[^"' ]*|seelectronics\.com[^"' ]*/g;

let n = 0;
fs.readdirSync(raiz).filter(f => f.endsWith('.html')).forEach(f => {
  const d = fs.readFileSync(path.join(raiz, f), 'utf8');
  if (!/X1 R/.test(d)) return;
  n++;
  const imgs = [...new Set((d.match(reImg) || []))];
  console.log('\n' + f + '  (' + (d.match(/X1 R/g) || []).length + ' menciones)');
  console.log('  ' + (imgs.length ? imgs.join('\n  ') : '(sin imagen en linea)'));
});
console.log('\npaginas que mencionan el X1 R: ' + n);
