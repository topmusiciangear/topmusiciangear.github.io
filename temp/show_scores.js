const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guias = [
  ['best-condenser-mics', ['Neumann U 87 Ai', 'AKG C414 XLII', 'Neumann TLM 103', 'Warm Audio WA-8000', 'Universal Audio Sphere DLX', 'sE Electronics sE2200', 'Lewitt LCT 440 PURE', 'Rode NT1 Signature Series', 'Audio-Technica AT2020']],
  ['best-headphones', ['Beyerdynamic DT 770 Pro', 'Sennheiser HD 490 Pro Plus', 'Audeze LCD-X', 'Sennheiser HD 600', 'Neumann NDH 30', 'Audio-Technica ATH-M50x', 'Audio-Technica ATH-R70xa', 'Samson SR850', 'Sony MDR-7506', 'Beyerdynamic DT 990 Pro', 'AKG K371', 'Audio-Technica ATH-M20x']],
];
guias.forEach(([id, names]) => {
  console.log('\n=== ' + id + ' ===');
  names.map(n => {
    const p = products.find(x => x.title === n || x.title_es === n) || products.find(x => x.title.includes(n));
    return { n, s: p ? p.score : null, price: p ? p.price : null };
  }).sort((a, b) => b.s - a.s).forEach(x => {
    console.log('  ' + x.s.toFixed(1) + '  ' + (x.price ? '$' + x.price : '?').padStart(9) + '  ' + x.n);
  });
});
