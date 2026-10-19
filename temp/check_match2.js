const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const norm = s => (s || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/\b(altavoz|active|active speaker|pasivo|passive|speaker|bajo|guitra|acustica|acústica|para)\b/g, '')
  .replace(/[^a-z0-9]/g, '');

const byNorm = {};
products.forEach(p => {
  const k = norm(p.title) || norm(p.title_es);
  if (k) (byNorm[k] = byNorm[k] || []).push(p);
});

const duplicadosES = [];
const ausentes = [];
const vistos = new Set();

guides.forEach(g => {
  if (!g.productTable || !g.productTable.columns) return;
  const n2 = new Map();
  g.productTable.columns.forEach(c => {
    const n = c.title_es || c.title;
    const key = g.id + '::' + n;
    if (vistos.has(key)) return;
    vistos.add(key);
    if (!n2.has(n)) n2.set(n, 0);
    n2.set(n, n2.get(n) + 1);
  });
  n2.forEach((count, n) => {
    if (products.find(p => p.title === n || p.title_es === n)) return;
    const cand = byNorm[norm(n)] || [];
    const unicos = [...new Set(cand)];
    // es un duplicado ES si el mismo producto ya aparece en la MISMA tabla con su nombre EN
    const tieneEN = [...n2.keys()].some(otro => otro !== n && unicos.some(p => p.title === otro || p.title_es === otro));
    if (tieneEN) duplicadosES.push({ id: g.id, n, match: unicos.map(p => p.title)[0] });
    else if (unicos.length === 1) ausentes.push({ id: g.id, n, match: unicos[0].title, score: unicos[0].score });
    else ausentes.push({ id: g.id, n, match: unicos.length ? unicos.map(p => p.title).join(' | ') : 'NINGUNO', score: null });
  });
});

console.log('=== DUPLICADOS ES (mismo producto repetido en la tabla) ===');
console.log(duplicadosES.length);
const porGuiaDup = {};
duplicadosES.forEach(d => (porGuiaDup[d.id] = porGuiaDup[d.id] || []).push(d.n + ' = ' + d.match));
Object.entries(porGuiaDup).forEach(([id, l]) => console.log('  ' + id + ' (' + l.length + ')\n     ' + l.join('\n     ')));

console.log('\n=== PRODUCTOS QUE NO ESTAN EN products.json ===');
console.log(ausentes.length);
const porGuiaAus = {};
ausentes.forEach(d => (porGuiaAus[d.id] = porGuiaAus[d.id] || []).push(d.n + (d.match !== 'NINGUNO' ? '  ~ ' + d.match : '')));
Object.entries(porGuiaAus).forEach(([id, l]) => console.log('  ' + id + ' (' + l.length + '): ' + l.join(', ')));
