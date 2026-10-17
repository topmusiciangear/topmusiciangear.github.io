const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const gp = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-plugins');
if (!g) { console.log('guia no encontrada'); process.exit(1); }
console.log('EN actual : ' + g.title + '  (' + g.title.length + ' car.)');
console.log('ES actual : ' + g.title_es + '  (' + g.title_es.length + ' car.)');
console.log('metaDesc_es: ' + g.metaDesc_es + '  (' + (g.metaDesc_es || '').length + ' car.)');
const NUEVO = 'Mejores plugins de guitarra y amp sims: no compres el equivocado';
g.title_es = NUEVO;
fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nES nuevo  : ' + NUEVO + '  (' + NUEVO.length + ' car.)');
console.log('limite    : 60 car. -> ' + (NUEVO.length <= 60 ? 'OK' : 'EXCEDE en ' + (NUEVO.length - 60)));
console.log('\nalternativas <= 60:');
['Plugins de guitarra y amp sims: no compres el equivocado',
 'Mejores plugins de guitarra y amp sims',
 'Mejores amp sims y plugins de guitarra con criterio',
 'Plugins de guitarra y amp sims sin meter la pata'].forEach(a => console.log('  ' + a.length + 'c  ' + a));