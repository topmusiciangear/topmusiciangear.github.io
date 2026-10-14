const fs = require('fs');
const f = 'C:/Users/Daniel/projects/topmusiciangear/temp/four_reviews.js';
let s = fs.readFileSync(f, 'utf8');
const fixes = [
  ['|altavoz', 'altavoz'],
  ['ninguna marca de|altavoz', 'ninguna marca de altavoz'],
  ['monitores que no sean Genelec', 'monitores que no sean Genelec'],
  ['con宝玉', 'con'],
  ['toFUNCTION', 'to'],
  ['Si tocasUNCTIONS', 'Si tocas'],
  ['Si tocas y la guitarra', 'Si tocas y la guitarra'],
  ['asíSin', 'así'],
  ['dobles- hasta、下', 'dobles- hasta'],
  ['queRIER承受', 'que aguantar'],
  ['que承受', 'que aguantar'],
  ['as anechoicos', ''],
  ['una marca denaam', 'una marca de'],
  ['El DS部', 'El'],
  ['sin调节', 'sin ajuste'],
  ['el graves es generoso', 'el graves es generoso'],
  ['de（原', 'de ']
];
let n = 0;
fixes.forEach(([a, b]) => { if (a !== b && s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(f, s, 'utf8');
const cjk = s.match(/[\u4e00-\u9fff]/g);
console.log('fixes: ' + n + ' | CJK: ' + (cjk ? JSON.stringify([...new Set(cjk)]) : 'ninguno'));
if (cjk) {
  const first = cjk[0];
  let k = -1, cnt = 0;
  while ((k = s.indexOf(first, k + 1)) > -1 && cnt < 6) { console.log('ctx: ' + JSON.stringify(s.slice(Math.max(0, k - 80), k + 40))); cnt++; }
}