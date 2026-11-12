// Verifica formato RAW (espaciado exacto) de needles candidatos en los 4 JSON
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const checks = [
  ['data/guides.json', 'value_es": "Todo terreno semiabierto'],
  ['data/guides.json', 'estándar de oro para podcasting'],
  ['data/guides.json', 'value_es": "Pocket sketching'],
  ['data/guides.json', 'val2_es": "3-way with switchable'],
  ['data/guides.json', 'B-roll run-and-gun'],
  ['data/guides.json', 'grabación y reproducción multitrack'],
  ['data/guides.json', '8 plugins en uno: mothership'],
  ['data/guides.json', 'Staging de ganancia'],
  ['data/products.json', 'es": "Todo terreno de estudio'],
  ['data/products.json', 'gabinete de MDF denso'],
  ['data/products.json', '"title": "Peterson StroboClip'],
  ['data/products.json', '"title": "TC Electronic Polytune Clip'],
  ['data/products.json', '"title": "Snark ST-8'],
  ['data/deals.json', 'todoterreno listo para la carretera'],
  ['data/deals.json', 'Todoterreno de 1500 W pico'],
  ['data/deals.json', 'verdadera todoterreno de estudio'],
  ['data/deals.json', 'verdadero arma secreta'],
  ['data/manual-deals.json', 'todoterreno listo para la carretera'],
  ['data/manual-deals.json', 'verdadera todoterreno de estudio'],
  ['data/manual-deals.json', 'verdadero arma secreta']
];
for (const [f, needle] of checks) {
  const t = fs.readFileSync(B + f, 'utf8');
  const i = t.indexOf(needle);
  if (i < 0) { console.log('NOT FOUND | ' + f + ' | ' + needle); continue; }
  const a = Math.max(0, i - 60);
  console.log(f + ' @' + i + ' RAW: ' + JSON.stringify(t.slice(a, i + needle.length + 60)));
}
