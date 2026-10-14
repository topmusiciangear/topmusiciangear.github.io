const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/im_reviews.js';
let s = fs.readFileSync(f, 'utf8');
// escapar apostrofos en las lineas de contenido EN (empiezan con '    '<p> y contienen 's/m/t/d)
const lines = s.split('\n');
let n = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (!/^\s{4}'<p>/.test(l)) continue;
  const fixed = l.replace(/([A-Za-z]|\)|\/|\b)'(?=[a-z])/g, "$1\\'");
  if (fixed !== l) { lines[i] = fixed; n++; }
}
s = lines.join('\n');
// CJK final
s = s.split('糖尿病').join('diabetes');
fs.writeFileSync(f, s, 'utf8');
console.log('apostrofos escapados: ' + n);
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('CJK restantes: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));