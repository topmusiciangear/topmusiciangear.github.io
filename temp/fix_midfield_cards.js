const fs = require('fs');

/* 1. Pros del MS-100 en la guía */
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');
const ms = g.verdictProsCons.find(x => x.name === 'Ultimate Support MS-100 Studio Monitor Stands (Pair)');
const i = ms.pros_es.findIndex(t => t.includes('midfield'));
if (i < 0) throw new Error('pros_es sin midfield');
ms.pros_es[i] = '34 kg de capacidad por soporte aguantan monitores de campo medio pesados';
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

/* 2. Descripción de catálogo del MS-100 en español */
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = products.find(x => x.id === 651);
if (!p || !p.desc_es.includes('midfield')) throw new Error('desc_es 651 sin midfield');
p.desc_es = p.desc_es.replace('monitores midfield pesados', 'monitores de campo medio pesados');
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');

console.log('pros_es:', ms.pros_es[i]);
console.log('desc_es:', p.desc_es);
