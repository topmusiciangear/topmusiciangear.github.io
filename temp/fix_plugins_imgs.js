const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const colData = {
  'TDR Kotelnikov GE': [
    "Transparent bus & master compression",
    "~$50",
    "Compressor",
    "VST2/VST3/AU/AAX",
    "macOS & Windows",
    "License file",
    "Ultra-low",
    "M/S, sidechain EQ, lookahead, oversampling"
  ],
  'Universal Audio UAD Ultimate 14': [
    "Vintage hardware emulations",
    "~$999",
    "Emulation suite",
    "VST2/VST3/AU/AAX",
    "macOS & Windows",
    "UAD DSP hardware required",
    "Near-zero (DSP)",
    "100+ emulations: Neve, API, SSL, Manley, Ampex"
  ]
};

const cols = guide.productTable.columns.map(c => c.title);
guide.productTable.rows.forEach(row => {
  ['TDR Kotelnikov GE', 'Universal Audio UAD Ultimate 14'].forEach(colTitle => {
    const ci = cols.indexOf(colTitle);
    const vals = colData[colTitle];
    if (ci >= 0 && vals) {
      row.values[ci].value = vals[guide.productTable.rows.indexOf(row)];
      row.values[ci].value_es = vals[guide.productTable.rows.indexOf(row)];
    }
  });
});

// Check if sections have images
const sectionImages = {
  'FabFilter Pro-Q 4': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE',
  'FabFilter Pro-C 3': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE'
};

// Check sections for images
guide.sections.forEach(s => {
  if (s.heading && s.heading.includes('Pro-Q')) {
    console.log('Pro-Q section has img:', s.content.includes('<img'));
  }
  if (s.heading && s.heading.includes('Pro-C')) {
    console.log('Pro-C section has img:', s.content.includes('<img'));
  }
  if (s.heading && s.heading.includes('Soundtoys')) {
    console.log('Soundtoys section has img:', s.content.includes('<img'));
  }
  if (s.heading && s.heading.includes('UAD')) {
    console.log('UAD section has img:', s.content.includes('<img'));
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
