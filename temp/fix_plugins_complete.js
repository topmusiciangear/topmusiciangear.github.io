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
    "Near-zero (DSP UAD)",
    "100+ emulations: Neve, API, SSL, Manley, Ampex"
  ]
};

const cols = guide.productTable.columns.map(c => c.title);
guide.productTable.rows.forEach((row, ri) => {
  Object.keys(colData).forEach(colTitle => {
    const ci = cols.indexOf(colTitle);
    const vals = colData[colTitle];
    if (ci >= 0 && vals) {
      if (!row.values[ci]) {
        row.values[ci] = { value: vals[ri], value_es: vals[ri] };
      } else {
        row.values[ci].value = vals[ri];
        row.values[ci].value_es = vals[ri];
      }
    }
  });
});

const sectionImgs = {
  'FabFilter Pro-Q 4': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE',
  'FabFilter Pro-C 3': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE',
  'Soundtoys 5.5 Bundle': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE',
  'Universal Audio UAD Ultimate 14': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE'
};

guide.sections.forEach(s => {
  if (s.heading && s.heading.includes('Pro-Q') && !s.content.includes('<img')) {
    s.content = '<div class="guide-section-imgs"><img src="https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE" alt="FabFilter Pro-Q 4" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>' + s.content;
    s.content_es = s.content;
    console.log('Added img to Pro-Q section');
  }
  if (s.heading && s.heading.includes('Pro-C') && !s.content.includes('<img')) {
    s.content = '<div class="guide-section-imgs"><img src="https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE" alt="FabFilter Pro-C 3" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>' + s.content;
    s.content_es = s.content;
    console.log('Added img to Pro-C section');
  }
  if (s.heading && s.heading.includes('Soundtoys') && !s.content.includes('<img')) {
    s.content = '<div class="guide-section-imgs"><img src="https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE" alt="Soundtoys 5.5 Bundle" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>' + s.content;
    s.content_es = s.content;
    console.log('Added img to Soundtoys section');
  }
  if (s.heading && s.heading.includes('UAD') && !s.content.includes('<img')) {
    s.content = '<div class="guide-section-imgs"><img src="https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE" alt="Universal Audio UAD Ultimate 14" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>' + s.content;
    s.content_es = s.content;
    console.log('Added img to UAD section');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
