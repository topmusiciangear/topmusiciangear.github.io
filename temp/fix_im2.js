const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/im_reviews.js';
let lines = fs.readFileSync(f, 'utf8').split('\n');
// 1. escapar apostrofos dentro de strings de contenido EN
let n = 0;
lines = lines.map(l => {
  if (/^\s*'<p>/.test(l) && /[a-z]'[a-z]/.test(l)) {
    const before = l;
    l = l.replace(/([A-Za-z\)\.,]|\b)'(?=[a-z])/g, "$1\\'");
    if (before !== l) n++;
  }
  return l;
});
// 2. borrar las lineas de limpieza heredadas que quedaron
const antes = lines.length;
lines = lines.filter(l => !/^NEW\[\d\]\.content(_es)? = NEW\[\d\]\.content(_es)?\.replace/.test(l.trim()));
// 3. borrar el bloque "// correccion de erratas..." vacio
fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('strings con apostrofe escapados: ' + n);
console.log('lineas de limpieza eliminadas: ' + (antes - lines.length));
const s = fs.readFileSync(f, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('CJK restantes: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
const m = s.match(/En batería es [^;<,]*/);
console.log('frase bateria: ' + (m ? m[0] : 'no encontrada'));