const fs = require('fs');
const { execSync } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const g = guides.find(x => x.id === 'best-reverb-delay');

console.log('Chase Bliss Habit en el catalogo:');
arr.filter(p => /habit/i.test(p.title)).forEach(p =>
  console.log('  id ' + p.id + ' | ' + p.title + ' | discontinued: ' + (p.discontinued || 'no')));

console.log('\nSecciones declaradas en guides.json (' + g.sections.length + '):');
g.sections.forEach((s, i) => console.log('  ' + (i + 1) + '. ' + (s.heading || s.h) + '  products=' + JSON.stringify(s.products)));

console.log('\nverdictProsCons en JSON:');
g.verdictProsCons.forEach((v, i) => console.log('  ' + (i + 1) + '. ' + (v.name || v.title)));

console.log('\n--- HISTORIAL: commits que tocaron esta guia ---');
console.log(execSync('git log --oneline -25 -- data/guides.json', { cwd: BASE, maxBuffer: 1e8 }).toString());

console.log('--- ¿se ha borrado alguna vez la seccion del Habit? ---');
try {
  const log = execSync('git log -S "Chase Bliss Habit" --oneline -- data/guides.json', { cwd: BASE, maxBuffer: 1e8 }).toString();
  console.log(log || '  (nunca aparece "Chase Bliss Habit" en guides.json)');
} catch (e) { console.log('  error: ' + e.message); }