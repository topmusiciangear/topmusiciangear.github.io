const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const isHub = (g) => /-vs-/.test(g.id) || /^pro-/.test(g.id);
const rows = []; let N = 0;
guides.forEach(g => {
  if (!isHub(g)) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1);
  const vp = (g.verdictProsCons || []).map(v => v.name || v.title).filter(Boolean);
  const enVp = arr.filter(p => vp.some(n => n === p.title || p.title.indexOf(n) === 0 || n.indexOf(p.title) === 0));
  const miss = enVp.filter(p => !solo.some(s => s.products[0] === p.id));
  if (!miss.length) return;
  N += miss.length;
  rows.push({ es: g.title_es, en: g.title, url: '/guides/' + g.id + '.html', miss: miss.map(p => p.title) });
});
rows.forEach((r, i) => {
  console.log('\n' + (i + 1) + '. ' + r.es);
  console.log('   EN: ' + r.en + '  |  ' + r.url + '  |  FALTAN ' + r.miss.length);
  r.miss.forEach(m => console.log('      - ' + m));
});
console.log('\nCOMPARATIVAS: ' + rows.length + ' guias | ' + N + ' reviews');