// Renombra los dos soportes para que quede claro que son stands de monitores.
const fs = require('fs');

// ---------- products.json ----------
const rawP = fs.readFileSync('data/products.json', 'utf8');
const products = JSON.parse(rawP);
const auralexRound = JSON.stringify(products, null, 2);
console.log('products.json roundtrip exacto:', rawP === auralexRound);

const titles = {
  646: {
    title: 'IsoAcoustics ISO-200 Studio Monitor Stands (Pair)',
    title_es: 'Soportes de monitor IsoAcoustics ISO-200 (par)'
  },
  651: {
    title: 'Ultimate Support MS-100 Studio Monitor Stands (Pair)',
    title_es: 'Soportes de monitor Ultimate Support MS-100 (par)'
  }
};

for (const [id, t] of Object.entries(titles)) {
  const p = products.find(x => x.id === Number(id));
  if (!p) throw new Error('no existe producto ' + id);
  console.log('id ' + id + ': ' + p.title + ' -> ' + t.title);
  p.title = t.title;
  p.title_es = t.title_es;
}

if (rawP === auralexRound) {
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
  console.log('products.json escrito');
} else {
  console.log('AVISO: products.json no hace roundtrip exacto, no se escribe');
}

// ---------- guides.json ----------
let g = fs.readFileSync('data/guides.json', 'utf8');
const before = g;

function rep(from, to) {
  const n = g.split(from).length - 1;
  if (!n) { console.log('AVISO no encontrado: ' + from.slice(0, 70)); return; }
  g = g.split(from).join(to);
  console.log(n + ' x  ' + from.slice(0, 70));
}

// prosa EN/ES (antes que los nombres sueltos, para arreglar la gramatica)
rep('The IsoAcoustics ISO-200 (Pair) uses a patented isolator',
    'The IsoAcoustics ISO-200 Studio Monitor Stands use a patented isolator');
rep('El IsoAcoustics ISO-200 (Par) usa un aislador patentado',
    'Los soportes IsoAcoustics ISO-200 (par) usan un aislador patentado');
rep('the Ultimate Support MS-100 (Pair) carries 34 kg per stand',
    'the Ultimate Support MS-100 Studio Monitor Stands carry 34 kg per stand');
rep('el Ultimate Support MS-100 (Par) soporta 34 kg por soporte',
    'los soportes Ultimate Support MS-100 (par) soportan 34 kg por soporte');

// nombres en fichas, veredicto y tabla comparativa
rep('"IsoAcoustics ISO-200 (Pair)"', '"IsoAcoustics ISO-200 Studio Monitor Stands (Pair)"');
rep('"IsoAcoustics ISO-200 (Par)"', '"Soportes de monitor IsoAcoustics ISO-200 (par)"');
rep('"Ultimate Support MS-100 (Pair)"', '"Ultimate Support MS-100 Studio Monitor Stands (Pair)"');
rep('"Ultimate Support MS-100 (Par)"', '"Soportes de monitor Ultimate Support MS-100 (par)"');

JSON.parse(g); // valida
fs.writeFileSync('data/guides.json', g, 'utf8');
console.log('guides.json escrito, cambios: ' + (g !== before));

console.log('\nrestos de nombres viejos:');
for (const n of ['IsoAcoustics ISO-200 (Pair)', 'IsoAcoustics ISO-200 (Par)', 'Ultimate Support MS-100 (Pair)', 'Ultimate Support MS-100 (Par)']) {
  console.log('  ' + n + ': ' + (g.split(n).length - 1));
}
