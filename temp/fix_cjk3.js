const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
let s = fs.readFileSync(gj, 'utf8');
const fixes = [
  ['Room response\u8865\u507f switches', 'Room response switches'],
  ['Entitlesanasia de esta lista', 'ligeros de esta lista'],
  ['Con 320 g est\u00e1 entre los Entitle，一步_puta', 'Con 320 g est\u00e1 entre los ligeros de esta lista']
];
let n = 0;
fixes.forEach(([a, b]) => { if (s.includes(a)) { s = s.split(a).join(b); n++; } });
// segundo intento: replacements directo de los caracteres CJK sueltos en su contexto
const solo = [
  ['\u8865\u507f switches', 'switches'],
  ['los Entitlecitada de esta lista', 'los ligeros de esta lista'],
  ['los Entitle', 'los ligeros'],
  ['，一步_puta de esta lista', ' de esta lista']
];
solo.forEach(([a, b]) => { if (s.includes(a)) { s = s.split(a).join(b); n++; } });
fs.writeFileSync(gj, s, 'utf8');
const rest = s.match(/[\u4e00-\u9fff]/g) || [];
console.log('fixes: ' + n + ' | CJK restantes: ' + JSON.stringify([...new Set(rest)]));
if (rest.length) {
  let k = -1;
  while ((k = s.indexOf(rest[0], k + 1)) > -1) console.log('ctx: ' + JSON.stringify(s.slice(Math.max(0, k - 90), k + 50)));
}