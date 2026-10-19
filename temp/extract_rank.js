// Extrae la senal de RANKING de cada guia para poder puntuarla a mano.
// No asigna nada: solo junta las pistas textuales que el propio autor escribio
// (veredicto, veredictos individuales, conclusion) con los productos y su score.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const override = require(B + 'temp/score_overrides.js');

function findProduct(name) {
  if (!name) return null;
  return products.find(p => p.title === name || p.title_es === name)
    || products.find(p => (p.title || '').includes(name) || (p.title_es || '').includes(name));
}

const out = [];
guides.forEach(g => {
  const names = [];
  (g.verdictProsCons || []).forEach(v => { const n = v.name; if (n && !names.includes(n)) names.push(n); });
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => { const n = c.title_es || c.title; if (n && !names.includes(n)) names.push(n); });
  }
  if (!names.length) return;

  out.push({
    id: g.id,
    title: g.title,
    n: names.length,
    reviewed: !!override[g.id],
    verdict: g.verdict || '',
    conclusion: g.conclusion || '',
    products: names.map(n => {
      const p = findProduct(n);
      return { name: n, score: p ? p.score : null, price: p ? p.price : null };
    }),
  });
});

fs.writeFileSync(B + 'temp/rank_signal.json', JSON.stringify(out, null, 2), 'utf8');
console.log('Guias con productos: ' + out.length);
console.log('Ya revisadas: ' + out.filter(o => o.reviewed).length);
console.log('Pendientes: ' + out.filter(o => !o.reviewed).length);
console.log('\nTotal de productos a revisar: ' + out.filter(o => !o.reviewed).reduce((a, b) => a + b.n, 0));
