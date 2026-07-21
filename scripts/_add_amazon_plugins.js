var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Plugin product IDs and their Amazon search terms
var pluginAmazonLinks = {
  28: { amazon: 'https://www.amazon.com/s?k=Native+Instruments+Kontakt+8&tag=topmusicg-20' },
  29: { amazon: 'https://www.amazon.com/s?k=FabFilter+Total+Bundle&tag=topmusicg-20' },
  30: { amazon: 'https://www.amazon.com/s?k=iZotope+Ozone+12+Advanced&tag=topmusicg-20' },
  32: { amazon: 'https://www.amazon.com/s?k=Soundtoys+5+Bundle&tag=topmusicg-20' },
  60: { amazon: 'https://www.amazon.com/s?k=UA+1176+Classic+Limiter+Collection&tag=topmusicg-20' },
  61: { amazon: 'https://www.amazon.com/s?k=TDR+Kotelnikov+GE&tag=topmusicg-20' },
  62: { amazon: 'https://www.amazon.com/s?k=FabFilter+Pro-Q+4&tag=topmusicg-20' },
  63: { amazon: 'https://www.amazon.com/s?k=FabFilter+Pro-C+3&tag=topmusicg-20' },
  110: { amazon: 'https://www.amazon.com/s?k=Ableton+Live+12+Suite&tag=topmusicg-20' },
  118: { amazon: 'https://www.amazon.com/s?k=Waves+Mercury+Bundle&tag=topmusicg-20' },
  119: { amazon: 'https://www.amazon.com/s?k=Waves+SSL+G-Master+Buss+Compressor&tag=topmusicg-20' },
  120: { amazon: 'https://www.amazon.com/s?k=Celemony+Melodyne+5&tag=topmusicg-20' },
  121: { amazon: 'https://www.amazon.com/s?k=Universal+Audio+UAD+Ultimate+14&tag=topmusicg-20' },
  122: { amazon: 'https://www.amazon.com/s?k=iZotope+RX+11+Advanced&tag=topmusicg-20' },
  123: { amazon: 'https://www.amazon.com/s?k=Native+Instruments+Komplete+26+Ultimate&tag=topmusicg-20' }
};

var count = 0;
p.forEach(function(pr) {
  if (pluginAmazonLinks[pr.id]) {
    if (!pr.affiliate) pr.affiliate = {};
    pr.affiliate.amazon = pluginAmazonLinks[pr.id].amazon;
    count++;
    console.log('Added Amazon to: ' + pr.title);
  }
});

fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log('Done. Updated ' + count + ' products.');
