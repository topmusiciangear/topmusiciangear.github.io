const fs = require('fs');
const f = 'build-guides.js';
let s = fs.readFileSync(f, 'utf8');
const before1 = (s.match(/t\('Verificar precio', 'Check price'\)/g) || []).length;
s = s.split("t('Verificar precio', 'Check price')").join("t('Verificar precio', 'Check Price')");
const before2 = (s.match(/tmgIsEsDoc\(\)\?'Verificar precio':'Check price'/g) || []).length;
s = s.split("tmgIsEsDoc()?'Verificar precio':'Check price'").join("tmgIsEsDoc()?'Verificar precio':'Check Price'");
fs.writeFileSync(f, s);
console.log(f + ': t() ' + before1 + ' | inline ' + before2);

const g = 'temp/gen-shop-buttons.js';
let t = fs.readFileSync(g, 'utf8');
const before3 = (t.match(/tmgIsEsDoc\(\) \? 'Verificar precio' : 'Check price'/g) || []).length;
t = t.split("tmgIsEsDoc() ? 'Verificar precio' : 'Check price'").join("tmgIsEsDoc() ? 'Verificar precio' : 'Check Price'");
fs.writeFileSync(g, t);
console.log(g + ': ' + before3);

// comprobar que no queda ninguna etiqueta vieja fuera de comentarios
for (const file of [f, g]) {
  const src = fs.readFileSync(file, 'utf8');
  const bad = src.split('\n').map((l, i) => ({ l, i: i + 1 })).filter(o => /'Check price'/.test(o.l) && !/^\s*\/\//.test(o.l.trim()));
  console.log(file + ' leftover label lines: ' + bad.length);
  bad.forEach(o => console.log('  ' + o.i + ': ' + o.l.trim().slice(0, 120)));
}
