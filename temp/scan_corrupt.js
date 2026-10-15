// Detectar texto corrupto en el script ANTES de ejecutarlo:
// caracteres CJK, y palabras latinas con mayuscula interna sospechosa.
const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/add_reviews_studio.js';
let s = fs.readFileSync(f, 'utf8');

console.log('=== 1) CJK ===');
const cjk = [...new Set((s.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []))];
console.log(cjk.length ? cjk.join(' ') : '  ninguno');

console.log('\n=== 2) palabras latinas pegadas / con mayuscula interna ===');
// tras una letra minuscula, una mayuscula que no sea inicio de frase
const pegadas = [...new Set((s.match(/[a-zá-úñ][A-ZÁÉÍÓÚÑ][a-zá-úñ]{2,}/g) || []))];
pegadas.forEach(w => console.log('  ' + w));

console.log('\n=== 3) punto y coma incrustado en palabra ===');
const puntos = [...new Set((s.match(/[a-zá-úñ];[a-zá-úñ]/g) || []))];
puntos.forEach(w => console.log('  ' + w));

console.log('\n=== 4) context de cada problema ===');
[...new Set([...cjk, ...pegadas, ...puntos])].forEach(token => {
  let i = s.indexOf(token);
  while (i > -1) {
    console.log('  [' + token + ']  ...' + s.slice(Math.max(0,i-45), i+token.length+45).replace(/\n/g,' ') + '...');
    i = s.indexOf(token, i+1);
  }
});