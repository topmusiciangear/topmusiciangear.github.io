// check_faq_html.js — Inspecciona el fragmento del FAQ (fs.faq_a5_en) en el HTML generado
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
for (const file of ['guides/studio-subwoofers.html', 'guides/studio-subwoofers_es.html']) {
  const h = fs.readFileSync(B + file, 'utf8');
  console.log('--- ' + file + ' ---');
  const idx = h.indexOf('best budget studio subwoofer');
  if (idx === -1) { console.log('   NO se encontro el fragmento FAQ'); continue; }
  const seg = h.slice(Math.max(0, idx - 200), idx + 200);
  console.log(seg);
  console.log('   -> aparece nombre:', /Kali Audio WS-6\.2/.test(seg));
  const m = h.match(/.{0,300}best budget studio subwoofer.{0,100}/s);
  if (m) console.log('   CONTEXTO:', m[0]);
}
