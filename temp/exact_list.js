const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const isHub = (g) => /-vs-/.test(g.id) || /^pro-/.test(g.id);

const rows = [];
guides.forEach(g => {
  if (isHub(g)) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1);
  const vp = (g.verdictProsCons || []).map(v => v.name || v.title).filter(Boolean);
  const enVp = arr.filter(p => vp.some(n => n === p.title || p.title.indexOf(n) === 0 || n.indexOf(p.title) === 0));
  const miss = enVp.filter(p => !solo.some(s => s.products[0] === p.id));
  if (!miss.length) return;
  rows.push({ id: g.id, en: g.title, es: g.title_es, url: '/guides/' + g.id + '.html',
    fichas: solo.length, total: enVp.length, miss: miss.map(p => ({ id: p.id, t: p.title })) });
});
rows.sort((a, b) => b.miss.length - a.miss.length);

let n = 0, N = 0;
rows.forEach((r, i) => {
  n++; N += r.miss.length;
  console.log('\n' + n + '. ' + r.es);
  console.log('   EN: ' + r.en);
  console.log('   ' + r.url + '  |  ' + r.fichas + ' de ' + r.total + ' productos con review  |  FALTAN ' + r.miss.length);
  r.miss.forEach(m => console.log('      - ' + m.t + ' (id ' + m.id + ')'));
});
console.log('\n=================================');
console.log('TOTAL: ' + n + ' guias | ' + N + ' reviews a escribir');
fs.writeFileSync(BASE + 'temp/pending_reviews.txt', rows.map((r, i) =>
  (i + 1) + '. ' + r.es + '  |  ' + r.url + '  |  FALTAN ' + r.miss.length + ': ' + r.miss.map(m => m.t).join('; ')
).join('\n'));
console.log('guardado en temp/pending_reviews.txt');