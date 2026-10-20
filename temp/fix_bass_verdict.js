const fs = require('fs');
const f = 'data/guides.json';
const gs = JSON.parse(fs.readFileSync(f, 'utf8'));
const g = gs.find(x => x.id === 'beginner-bass-guitars');

const before = g.verdict + g.verdict_es;

// 1. Drop the old Sire V5 (id 163) paragraph entirely
g.verdict = g.verdict.replace(/<p><strong><span class="product-name">Sire Marcus Miller V5 4-String Bass<\/span><\/strong>[^]*?<\/p>\s*$/, '');
g.verdict_es = g.verdict_es.replace(/<p><strong><span class="product-name">Sire Marcus Miller V5 4 Cuerdas<\/span><\/strong>[^]*?<\/p>\s*$/, '');

// 2. Clean the surviving V5R name
g.verdict = g.verdict.replace('Sire Marcus Miller V5R 4-String Bass', 'Sire Marcus Miller V5R');
g.verdict_es = g.verdict_es.replace('Sire Marcus Miller V5R 4 Cuerdas', 'Sire Marcus Miller V5R');

// 3. Natural ES fixes in the same block
g.verdict_es = g.verdict_es
  .replace('para una sustain y resonancia increíbles', 'para un sustain y una resonancia increíbles')
  .replace('El bajo más vendido del mundo acaba de mejorar.', 'El bajo más vendido del mundo, ahora todavía mejor.')
  .replace('Caballo de batalla de aliso con pastillas cerámicas V3 P/J, mástil fino de maple y Vol/Vol/Tono pasivos.', 'Bajo de aliso irrompible con pastillas cerámicas V3 P/J, mástil fino de maple y Vol/Vol/Tono pasivos.');

fs.writeFileSync(f, JSON.stringify(gs, null, 2));

const after = g.verdict + g.verdict_es;
console.log('changed:', before !== after);
console.log('V5 without R:', /V5(?!R)/.test(after));
console.log('4 Cuerdas / 4-String:', /4 Cuerdas|4-String/.test(after));
console.log('caballo de batalla:', /caballo de batalla/i.test(after));
console.log('V5R count:', (after.match(/V5R/g) || []).length);
