const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_faqs.js';
let s = fs.readFileSync(f, 'utf8');
const lines = s.split('\n');
// localizar el bloque "j48-vs-rndi: faltaban los ES" y eliminarlo
let out = [], i = 0, removed = 0;
while (i < lines.length) {
  if (/j48-vs-rndi: faltaban los ES de Q1 y Q2/.test(lines[i])) {
    // saltar hasta que termine el bloque (lineas que no empiecen por "if (!")
    let j = i + 1;
    while (j < lines.length && !/^fs\.writeFileSync/.test(lines[j])) {
      if (/^\/\/ /.test(lines[j]) && !/j48/.test(lines[j])) break;
      j++;
    }
    i = j; removed++;
    continue;
  }
  out.push(lines[i]); i++;
}
s = out.join('\n');
// insertar el relleno de ES antes del bucle
const anchor = 'let total = 0;';
const pre = `// rellenar primero los ES que faltan en guias antiguas
guides.forEach(g => {
  const fq = g.featuredSnippet;
  if (!fq) return;
  for (let k = 1; k <= 8; k++) {
    if (fq['faq_q' + k + '_en'] && !fq['faq_q' + k + '_es']) {
      fq['faq_q' + k + '_es'] = fq['faq_q' + k + '_en'];
      console.log(g.id + ': Q' + k + ' ES relleno provisorio');
    }
  }
});

let total = 0;`;
if (!s.includes(anchor)) { console.log('!! no encuentro "let total"'); process.exit(1); }
s = s.replace(anchor, pre);
fs.writeFileSync(f, s, 'utf8');
console.log('bloque eliminado: ' + removed + ' | relleno insertado: ' + (s.includes('relleno provisorio') ? 'ok' : 'NO'));