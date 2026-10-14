const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-home-office');
const idx = g.productTable.columns.findIndex(c => c.title === 'Taylor GS Mini-e Koa');
const set = (label, en, es) => {
  const r = g.productTable.rows.find(x => x.label === label);
  if (!r) { console.log('!! fila no encontrada: ' + label); process.exit(1); }
  r.values[idx] = { value: en, value_es: es };
  console.log('[' + label + '] -> ' + en);
};
// Taylor GS Mini-e Koa: tapa koa hawaiano solida, fondo/aros koa laminado,
// electronica ES-B con afinador (jack 6.35mm, pila 9V), ~$899
set('Estimated Price', '~$899', '~$899');
set('Top / Back & Sides', 'Solid Hawaiian koa / layered koa', 'Koa hawaiano sólido / koa laminado');
set('Electronics', 'ES-B with tuner', 'ES-B con afinador');
set('Outputs', '1/4 in output (ES-B)', 'Salida jack 6,35 mm (ES-B)');
set('Battery & Power', '9V battery (ES-B)', 'Pila 9V (ES-B)');
fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('guardado');