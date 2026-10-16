const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'dxr-vs-prx');
let S = JSON.stringify(gg);
function swap(de, a) {
  if (!S.includes(de)) { console.log('  FALLA ' + de.slice(0, 60)); return; }
  S = S.split(de).join(a);
  console.log('  ok ' + a.slice(0, 60));
}
swap('mientras que el PRX ONE ofrece una comodidad excepcional y una configuración rápida para actos solistas.</strong> El DXR12mkII ofrece máxima flexibilidad como componente PA tradicional que puedes usar en cualquier configuración.',
  'mientras que el PRX ONE ofrece una comodidad excepcional y un montaje rápido para solistas.</strong> El DXR12mkII se integra en cualquier configuración como componente PA tradicional.');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
