const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

// Pesos verificados de fuentes oficiales
const pesos = {
  'Shure SM57': { value: '284 g (0.63 lb)', value_es: '284 g (0.63 lb)' },
  'Shure SM58': { value: '297 g (0.66 lb)', value_es: '297 g (0.66 lb)' },
  'Shure Beta 57A': { value: '285 g (0.63 lb)', value_es: '285 g (0.63 lb)' },
  'Shure Beta 58A': { value: '285 g (0.63 lb)', value_es: '285 g (0.63 lb)' },
  'Sennheiser e906': { value: '130 g (0.29 lb)', value_es: '130 g (0.29 lb)' },
  'Sennheiser e935': { value: '165 g (0.36 lb)', value_es: '165 g (0.36 lb)' },
  'Sennheiser e945': { value: '165 g (0.36 lb)', value_es: '165 g (0.36 lb)' },
  'Sennheiser EW-D Dual Wireless System': { value: 'Not published', value_es: 'No publicado' },
  'Beyerdynamic M 201 TG': { value: '200 g (0.44 lb)', value_es: '200 g (0.44 lb)' },
  'Telefunken M80': { value: '330 g (0.73 lb)', value_es: '330 g (0.73 lb)' },
  'Audix OM7': { value: '302 g (0.67 lb)', value_es: '302 g (0.67 lb)' },
  'Electro-Voice ND86': { value: '340 g (0.75 lb)', value_es: '340 g (0.75 lb)' },
  'Electro-Voice RE20': { value: '737 g (1.63 lb)', value_es: '737 g (1.63 lb)' },
  'Coles 4038': { value: '470 g (1.04 lb)', value_es: '470 g (1.04 lb)' },
};

let fixes = 0;

['best-mic-for-guitar-amps', 'stage-mics', 'best-instrument-mics'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g || !g.productTable) return;

  // Find the Weight row
  const weightRow = g.productTable.rows.find(r => {
    const label = (r.label_es || r.label || '').toLowerCase();
    return label.includes('peso') || label.includes('weight');
  });

  if (!weightRow) {
    console.log(id + ': no tiene fila de peso');
    return;
  }

  const cols = g.productTable.columns.map(c => c.title);
  let guideFixes = 0;

  weightRow.values.forEach((v, i) => {
    const productName = cols[i];
    const currentVal = v.value || v.value_es || '';
    const isNP = currentVal.toLowerCase().includes('not published') || currentVal.toLowerCase().includes('no publicado');

    if (isNP && pesos[productName]) {
      const peso = pesos[productName];
      if (peso.value !== 'Not published') {
        v.value = peso.value;
        v.value_es = peso.value_es;
        guideFixes++;
        fixes++;
        console.log(id + ' / ' + productName + ': ' + peso.value);
      }
    }
  });

  if (guideFixes > 0) console.log(id + ': ' + guideFixes + ' pesos rellenados');
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Total fixes:', fixes);