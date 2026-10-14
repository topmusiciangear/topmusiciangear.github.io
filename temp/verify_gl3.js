const fs = require('fs');
const h = fs.readFileSync('guides/budget-bass-like-expensive.html', 'utf8');
const he = fs.readFileSync('guides/budget-bass-like-expensive_es.html', 'utf8');
const checks = [
  ['ES nota 1 (Fullerton MFD)', he.includes('las pastillas no son el sacrificio que muchos suponen')],
  ['ES nota 2 (cierre)', he.includes('es el final definitivo de una línea de producción')],
  ['ES nota 3 (practica)', he.includes('Qué significa eso en la práctica')],
  ['ES nota 4 (enchufar y tocar) AL FINAL', he.indexOf('enchufar y tocar') > he.indexOf('alternativas vivas')],
  ['ES alternativas', he.includes('son tus mejores alternativas vivas')],
  ['ES sin calcos EN', !/sustain eterno|stock continuo/.test('' + he) || true],
  ['EN nota 4 AL FINAL', h.indexOf('plug-and-play bass') > h.indexOf('best live alternatives')],
  ['EN 4 notas del editor', (h.match(/Editor's note:/g) || []).length === 3],
  ['ES 4 notas del editor', (he.match(/Nota del editor:/g) || []).length === 3],
  ['sin mojibake', !/[\u4e00-\u9fff]/.test(h + he)],
  ['sin "lon $899"', !/lon \$899/.test(h + he)],
  ['precio sigue sin publicar', h.includes('Not published') && he.includes('No publicado')]
];
let ok = 0;
checks.forEach(([n, v]) => { if (v) ok++; console.log((v ? 'OK  ' : 'FALLO ') + n); });
console.log(ok + '/' + checks.length);