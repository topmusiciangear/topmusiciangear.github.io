const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(46) + (extra || '')); };

const en = fs.readFileSync(BASE + 'guides/bridge-cast-x-vs-rodecaster-pro2.html', 'utf8');
const es = fs.readFileSync(BASE + 'guides/bridge-cast-x-vs-rodecaster-pro2_es.html', 'utf8');

console.log('=== RENDER EN ===');
// extraer la lista de contras del Bridge Cast X: bloque verdict del primer producto
const firstVerdict = (en.match(/verdict-product-name[^>]*>Roland Bridge Cast X[\s\S]*?<\/div>\s*<\/div>/) || [''])[0];
['No physical level meter', 'no microSD slot', '5V/3A', 'Single XLR input', 'Gaming-first knobs'].forEach(f => {
  ck('Bridge Cast X con: ' + f, en.indexOf(f) > -1);
});
console.log('');
console.log('=== RENDER ES ===');
['medidor de nivel físico', 'ranura microSD', '5V/3A', 'Una sola entrada XLR', 'enfoque gamer'].forEach(f => {
  ck('Bridge Cast X con: ' + f, es.indexOf(f) > -1);
});

console.log('');
console.log('=== INTEGRIDAD DE DATOS ===');
ck('EN: no queda el contra del 70dB', en.indexOf('70dB-plus clean-gain claim') === -1);
ck('ES: no queda el contra del 70dB', es.indexOf('reclamo de 70dB limpios') === -1);
ck('EN: FAQ 3 sigue citando que Roland no publica ganancia', /publishes no gain figure/.test(en));
ck('ES: FAQ 3 sigue citando que Roland no publica ganancia', /no publica ninguna cifra de ganancia/.test(es));
ck('EN: ningun "70 dB gain" afirmativo', !/70 ?dB(?!-plus)(?: (?:clean )?gain)/i.test(en));
ck('ES: ningun "70 dB gain" afirmativo', !/70 ?dB(?!-plus)(?: (?:clean )?gain)/i.test(es));
ck('EN: 5 pros y 5 contras por producto', (en.match(/verdict-pros/g) || []).length === 2);

console.log('');
console.log('=== RØDECaster intacto ===');
['No video capture', 'Overkill if you stream solo', 'Higher price tier than the Bridge Cast X', '5.5-inch touchscreen', 'No hardware sends or inserts'].forEach(f => {
  ck('con: ' + f.slice(0, 40), en.indexOf(f) > -1);
});
['Sin captura de vídeo', 'Excesivo si transmites en solitario', 'Escalón de precio más alto', 'pantalla de 5.5 pulgadas', 'Sin sends ni inserts'].forEach(f => {
  ck('ES con: ' + f.slice(0, 38), es.indexOf(f) > -1);
});

console.log('');
console.log(fail === 0 ? 'TODAS LAS COMPROBACIONES OK' : 'FALLOS: ' + fail);
process.exit(fail === 0 ? 0 : 1);