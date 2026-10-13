const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(42) + (extra || '')); };

['guides/bridge-cast-x-vs-rodecaster-pro2.html', 'guides/bridge-cast-x-vs-rodecaster-pro2_es.html'].forEach(function (p) {
  const h = fs.readFileSync(BASE + p, 'utf8');
  console.log('=== ' + p + ' ===');

  // localizar las filas Mic Preamps y Recording en el HTML
  const rowOf = function (label) {
    const re = new RegExp('<tr[^>]*>(?:(?!</tr>)[\\s\\S])*?' + label.replace(/[ ]/g, '[ \\s]*') + '(?:(?!</tr>)[\\s\\S])*?</tr>', 'i');
    const m = h.match(re);
    if (!m) return null;
    return (m[0].match(/<td[^>]*>([\s\S]*?)<\/td>/g) || []).map(x => x.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim());
  };

  const pre = rowOf('Mic Preamps');
  const rec = rowOf('Recording');
  if (!pre || !rec) { ck('filas encontradas', false); console.log(''); return; }

  console.log('       Mic Preamps: ' + pre.slice(1).join('   ||   '));
  console.log('       Recording  : ' + rec.slice(1).join('   ||   '));

  ck('Mic Preamps col1 (Bridge Cast) = rango real', /8 k/.test(pre[1]), pre[1]);
  ck('Mic Preamps col2 (RØDECaster) intacto', /76dB Revolution/.test(pre[2]), pre[2]);
  ck('Recording col1 (Bridge Cast) = 2 buses', /2 mix buses/.test(rec[1]) && /32-bit float internal/.test(rec[1]), rec[1]);
  ck('Recording col2 (RØDECaster) intacto', /microSD/.test(rec[2]), rec[2]);

  // ninguna afirmacion positiva de 70 dB de ganancia
  const positive70 = h.match(/70 ?dB(?!-plus)(?: (?:clean )?gain)/gi);
  ck('sin "70 dB gain" afirmativo', !positive70, positive70 ? positive70.join(', ') : '');
  ck('el "no hay reclamo de 70dB" se conserva', /no (?:hay reclamo de )?70dB|no 70dB-plus/i.test(h));

  // FAQ 3
  const faq3 = h.match(/guide-faq-question[^>]*>([\s\S]{0,200}?)<span class="guide-faq-icon">[\s\S]*?guide-faq-answer[\s\S]*?Roland([^<]{0,200})/);
  ck('FAQ3 cita la ficha de Roland', /publishes no gain figure|no publica ninguna cifra/.test(h), (faq3 ? faq3[1] : '').slice(0, 60));
  console.log('');
});

console.log(fail === 0 ? 'TODAS LAS COMPROBACIONES OK' : 'FALLOS: ' + fail);
process.exit(fail === 0 ? 0 : 1);