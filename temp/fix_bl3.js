const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'blx288-vs-ewd');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('tienen patrón cardioide y respuesta de frecuencia optimizada para voz en vivo. No son los SM58,',
  'tienen patrón cardioide y respuesta de frecuencia optimizada para voz en vivo.</strong> No son los SM58,');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
const t = g.find(x => x.id === 'blx288-vs-ewd').sections[0].content_es;
const opens = (t.match(/<strong>/g) || []).length;
const closes = (t.match(/<\/strong>/g) || []).length;
console.log('strong opens: ' + opens + ' closes: ' + closes);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
