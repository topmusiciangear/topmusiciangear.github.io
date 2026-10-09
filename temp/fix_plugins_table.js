const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const newCols = ['TDR Kotelnikov GE', 'Universal Audio UAD Ultimate 14'];
newCols.forEach(title => {
  if (!guide.productTable.columns.find(c => c.title === title)) {
    guide.productTable.columns.push({ title, title_es: title });
    console.log('Added column:', title);
  }
});

const colData = {
  'TDR Kotelnikov GE': {
    'Best For': "Compresión transparente de bus y master",
    'Estimated Price': "~$50",
    'Type': "Compresor",
    'Format': "VST2/VST3/AU/AAX",
    'Platforms': "macOS y Windows",
    'Copy Protection': "Archivo de licencia",
    'Latency': "Ultrabaja",
    'Featured Feature': "M/S, sidechain EQ, lookahead, oversampling"
  },
  'Universal Audio UAD Ultimate 14': {
    'Best For': "Emulaciones de hardware vintage",
    'Estimated Price': "~$999",
    'Type': "Suite de emulaciones",
    'Format': "VST2/VST3/AU/AAX",
    'Platforms': "macOS y Windows",
    'Copy Protection': "DSP UAD obligatorio",
    'Latency": "Casi nula (DSP UAD)",
    'Featured Feature': "100+ emulaciones: Neve, API, SSL, Manley, Ampex"
  }
};

const cols = guide.productTable.columns.map(c => c.title);
guide.productTable.rows.forEach(row => {
  newCols.forEach(colTitle => {
    const ci = cols.indexOf(colTitle);
    const val = colData[colTitle][row.label];
    if (val && ci >= 0 && row.values[ci]) {
      row.values[ci].value = val;
      row.values[ci].value_es = val;
      console.log('Set:', row.label, '/', colTitle, '->', val);
    }
  });
});

guide.featuredProducts = [28, 29, 30, 32, 60, 61, 62, 63, 118, 119, 120, 121, 122, 123, 389, 379];

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done. Cols:', guide.productTable.columns.length);
