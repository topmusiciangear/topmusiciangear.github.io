const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const v = G.find(x => x.id === 'premium-interfaces').verdictProsCons.find(v => v.name === 'Lynx Aurora-n 16 TB3');
v.cons_es = ['Precio premium solo por conversión', 'Solo Thunderbolt 3 — sin respaldo USB en esta versión', 'Sin efectos DSP ni funciones controlador monitor', 'Expansión MADI/Dante vía tarjetas opcionales de pago'];
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'premium-interfaces');
const bad = g.verdictProsCons.filter(v => v.pros.length < 4 || v.cons.length < 4 || (v.pros_es || []).length < 4 || (v.cons_es || []).length < 4);
console.log('below-min: ' + (bad.map(v => v.name).join(',') || 'none — all 7 have 4/4 EN+ES'));
