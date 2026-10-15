const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

console.log('=== featuredProducts ===');
console.log(JSON.stringify(guia.featuredProducts));

console.log('\n=== SECCIONES (indice: heading | products) ===');
guia.sections.forEach((s, i) => {
  console.log('  [' + String(i).padStart(2) + '] ' + (s.heading_es || s.heading));
  console.log('       productos: ' + (s.products || []).map(id => id + '(' + (byId[id] ? byId[id].title.slice(0, 26) : '?') + ')').join(', '));
});

console.log('\n=== VEREDICTOS ===');
guia.verdictProsCons.forEach((v, i) => console.log('  [' + String(i).padStart(2) + '] ' + String(v.productId).padStart(4) + '  ' + v.name));

// donde aparece cada producto
console.log('\n=== DONDE APARECE CADA PRODUCTO (secciones) ===');
const todos = new Set();
guia.sections.forEach(s => (s.products || []).forEach(p => todos.add(p)));
[...todos].sort((a, b) => a - b).forEach(id => {
  const secs = guia.sections.map((s, i) => (s.products || []).includes(id) ? i : -1).filter(i => i > -1);
  const enVeredicto = guia.verdictProsCons.some(v => v.productId === id);
  const enFav = (guia.featuredProducts || []).includes(id);
  console.log('  id ' + String(id).padStart(4) + '  ' + (byId[id] ? byId[id].title.slice(0, 34) : '?').padEnd(36) +
    ' secciones: [' + secs.join(',') + ']  veredicto:' + (enVeredicto ? 'si' : 'NO') + '  featured:' + (enFav ? 'si' : 'NO'));
});

// textos a tocar
console.log('\n\n=== TEXTOS QUE MENCIONAN $485 o SM57 ===');
const chequeos = [
  ['intro', guia.intro], ['intro_es', guia.intro_es],
  ['description', guia.description], ['description_es', guia.description_es],
  ['conclusion', guia.conclusion], ['conclusion_es', guia.conclusion_es],
  ['verdict', guia.verdict], ['verdict_es', guia.verdict_es],
  ['featuredSnippet', guia.featuredSnippet]
];
chequeos.forEach(([k, v]) => {
  if (!v) return;
  if (/\$485|SM57/.test(v)) console.log('\n--- ' + k + ' ---\n' + v.replace(/<\/?p>/g, '\n').slice(0, 900));
});
guia.sections.forEach((s, i) => {
  ['content', 'content_es'].forEach(k => {
    const v = s[k] || '';
    if (/\$485|SM57/.test(v)) {
      console.log('\n--- sections[' + i + '].' + k + ' ("' + (s.heading_es || s.heading) + '") ---');
      const m = v.match(/[\s\S]{0,300}(?:\$485|SM57)[\s\S]{0,300}/g) || [];
      m.forEach(x => console.log('   ...' + x.replace(/\s+/g, ' ') + '...'));
    }
  });
});
// FAQ
const faqJson = JSON.stringify(guia).match(/\?\{[^}]*SM57[^}]*\}/g);
if (faqJson) faqJson.forEach(x => console.log('\n--- FAQ con SM57 ---\n   ' + x));
