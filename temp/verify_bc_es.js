const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(44) + (extra || '')); };

const h = fs.readFileSync(BASE + 'guides/bridge-cast-x-vs-rodecaster-pro2_es.html', 'utf8');
console.log('=== guides/bridge-cast-x-vs-rodecaster-pro2_es.html ===');

const rowOf = function (label) {
  const re = new RegExp('<tr[^>]*>(?:(?!</tr>)[\\s\\S])*?' + label + '(?:(?!</tr>)[\\s\\S])*?</tr>', 'i');
  const m = h.match(re);
  if (!m) return null;
  return (m[0].match(/<td[^>]*>([\s\S]*?)<\/td>/g) || []).map(x => x.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
};

const pre = rowOf('Preamplificadores');
const rec = rowOf('Grabación');
if (!pre || !rec) { ck('filas ES encontradas', false, 'pre=' + !!pre + ' rec=' + !!rec); }
else {
  console.log('       Preámplificadores: ' + pre.slice(1).join('   ||   '));
  console.log('       Grabación       : ' + rec.slice(1).join('   ||   '));
  ck('Preamp col1 (Bridge Cast) = rango real', /8 k/.test(pre[1]), pre[1]);
  ck('Preamp col2 (RØDECaster) intacto', /76dB Revolution/.test(pre[2]), pre[2]);
  ck('Grabacion col1 = 2 buses + float interno', /2 buses de mezcla/.test(rec[1]) && /32 bits flotantes/.test(rec[1]), rec[1]);
  ck('Grabacion col2 (RØDECaster) intacto', /microSD/.test(rec[2]), rec[2]);
  ck('textos naturales en español (sin "Not published")', !/Not published/.test(h));
}

// FAQ 3 ES: la pregunta sobre SM7B y su respuesta
const faq3q = h.match(/guide-faq-question[^>]*>¿Cuál suena mejor con un Shure SM7B\?[\s\S]*?guide-faq-answer-inner">([\s\S]{0,900}?)<\/div>/);
if (faq3q) {
  const ans = faq3q[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('\n       FAQ3 ES respuesta:\n       ' + ans);
  ck('FAQ3 ES cita que Roland no publica ganancia', /no publica ninguna cifra de ganancia/.test(ans));
  ck('FAQ3 ES cita el rango real de Roland', /-87 a -12 dBu/.test(ans));
} else {
  ck('FAQ3 ES localizada', false);
}

// la negacion del "contra" del Bridge Cast X
ck('contra ES del Bridge Cast X sigue siendo negacion', /no hay reclamo de 70dB/.test(h));

console.log(fail === 0 ? '\nTODAS LAS COMPROBACIONES ES OK' : '\nFALLOS: ' + fail);
process.exit(fail === 0 ? 0 : 1);