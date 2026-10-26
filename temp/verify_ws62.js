// verify_ws62.js — Verificación desde DISCO del estado de studio-subwoofers tras la restauración
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
const s = sub.sections[4];
let ok = true;
function chk(label, cond, val) {
  if (!cond) ok = false;
  console.log((cond ? 'OK   ' : 'FAIL ') + label + (val !== undefined ? ': ' + JSON.stringify(val) : ''));
}
chk('heading', s.heading === 'Kali Audio WS-6.2: Best for Canceling Cabinet Vibrations', s.heading);
chk('heading_es', s.heading_es === 'Kali Audio WS-6.2: mejor para cancelar vibraciones de la caja', s.heading_es);
chk('columns[3].title', sub.productTable.columns[3].title === 'Kali Audio WS-6.2', sub.productTable.columns[3].title);
chk('columns[3].title_es', sub.productTable.columns[3].title_es === 'Kali Audio WS-6.2', sub.productTable.columns[3].title_es);
chk('vpc[3].name', sub.verdictProsCons[3].name === 'Kali Audio WS-6.2', sub.verdictProsCons[3].name);
chk('vpc[3].name_es', sub.verdictProsCons[3].name_es === 'Kali Audio WS-6.2', sub.verdictProsCons[3].name_es);
[['content', s.content], ['content_es', s.content_es], ['verdict', sub.verdict], ['verdict_es', sub.verdict_es],
 ['text_en', sub.featuredSnippet.text_en], ['text_es', sub.featuredSnippet.text_es],
 ['faq_a5_en', sub.featuredSnippet.faq_a5_en], ['faq_a5_es', sub.featuredSnippet.faq_a5_es]].forEach(([k, v]) => {
  chk(k + ' contiene nombre', typeof v === 'string' && v.includes('Kali Audio WS-6.2'));
});
chk('faq_a5_en sin "It" suelto', !/It is the best budget/.test(sub.featuredSnippet.faq_a5_en) && !/T10S It is/.test(sub.featuredSnippet.faq_a5_en));
chk('sin spans vacios en verdict/verdict_es', !/<span class="product-name"> <\/span>/.test(sub.verdict) && !/<span class="product-name"> <\/span>/.test(sub.verdict_es));
console.log(ok ? '\nVERIFICACION COMPLETA: TODO OK' : '\nHAY FALLOS');
process.exit(ok ? 0 : 1);
