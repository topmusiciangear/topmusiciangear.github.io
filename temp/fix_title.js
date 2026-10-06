const fs = require('fs');
const gFile = 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const gd = G.find(x => x.id === 'best-digital-pianos');
if (gd.titleTag_es !== 'Mejores pianos digitales para cada presupuesto') throw new Error('unexpected titleTag_es: ' + gd.titleTag_es);
gd.titleTag_es = 'Mejores pianos digitales para estudio y hogar';
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('titleTag_es restored');
