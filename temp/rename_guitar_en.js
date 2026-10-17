const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const gp = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-plugins');
if (!g) { console.log('guia no encontrada'); process.exit(1); }
console.log('EN antes: ' + g.title + '  (' + g.title.length + ' car.)');
console.log('ES ahora: ' + g.title_es + '  (' + g.title_es.length + ' car.)');
const NUEVO_EN = "Best Guitar Plugins & Amp Sims: Don't Buy the Wrong One";
g.title = NUEVO_EN;
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nEN nuevo : ' + NUEVO_EN + '  (' + NUEVO_EN.length + ' car.)');
console.log('limite 60: ' + (NUEVO_EN.length <= 60 ? 'OK' : 'EXCEDE en ' + (NUEVO_EN.length - 60)));
console.log('ES sigue  : ' + g.title_es + '  (' + g.title_es.length + ' car.)');
// comprobacion de paridad de los dos titulos
console.log('\nparidad: ambos mencionan "amp sims" -> ' + (/amp sims/i.test(g.title) && /amp sims/i.test(g.title_es)));
console.log('paridad: ambos avisos "equivocado/Wrong" -> ' + (/equivocado/i.test(g.title_es) && /wrong/i.test(g.title)));