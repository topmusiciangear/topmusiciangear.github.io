const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
let s = fs.readFileSync(gj, 'utf8');
const bad = 'ligeros\u9633\u7505';
if (!s.includes(bad)) {
  const alt = 'ligeros' + '\u9633' + '\u7505';
  if (s.includes(alt)) s = s.split(alt).join('ligeros');
  else { console.log('no encuentro el patron, filtro generico'); s = s.replace(/ligeros[\u4e00-\u9fff]+ de esta lista/g, 'ligeros de esta lista'); }
} else s = s.split(bad).join('ligeros');
fs.writeFileSync(gj, s, 'utf8');
const rest = s.match(/[\u4e00-\u9fff]/g) || [];
console.log('CJK restantes: ' + JSON.stringify([...new Set(rest)]));
const i = s.indexOf('320 g est');
console.log('ctx: ' + JSON.stringify(s.slice(i - 10, i + 120)));