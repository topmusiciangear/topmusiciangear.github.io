const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const html = fs.readFileSync(B + 'guides/mics-for-creators_es.html', 'utf8');

const titulos = (html.match(/guide-product-card-title">([^<]+)/g) || []).map(t => t.replace(/.*>/, '').trim());
const badges = html.match(/Nuestra nota: ([0-9.]+) sobre 10/g) || [];
const notas = badges.map(b => Number((b.match(/([0-9.]+)/) || [])[1]));

titulos.forEach((t, i) => {
  if (!/AT2020USB|AT2040|AT2020/.test(t)) return;
  console.log('pagina: ' + notas[i] + '  titulo: "' + t + '"');
  const base = t.replace(/ \((cada uno|par)\)$/, '');
  const p = products.find(x => x.title_es === base || x.title === base);
  console.log('   producto encontrado: ' + (p ? p.id + ' title="' + p.title + '" title_es="' + p.title_es + '"' : 'NINGUNO'));
  if (p) {
    const unit = p.unit;
    const esperado = unit === 'each' ? base + ' (cada uno)' : unit === 'pair' ? base + ' (par)' : base;
    console.log('   clave buscada: "' + esperado + '"');
  }
});
