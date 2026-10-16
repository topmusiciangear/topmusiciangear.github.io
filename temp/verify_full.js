const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
[['guides/mixing-plugins.html', ['SSL Mastering Bundle', 'NUGEN Audio ISL 2st']],
 ['guides/vocal-plugins.html', ['RePitch 2 Standard', 'VocAlign 7 Pro Bundle']]].forEach(([f, names]) => {
  const h = fs.readFileSync(B + f, 'utf8');
  names.forEach(n => {
    const inTable = h.includes('<th>' + n) || h.includes('>' + n + '</th>');
    const inVerdict = h.includes('verdict-product-name">' + n);
    const inCard = h.includes('guide-product-card-title">' + n);
    console.log(f + ' | ' + n + ': table=' + inTable + ' verdict=' + inVerdict + ' card=' + inCard);
  });
  // buy buttons for pluginboutique
  const pbBtns = (h.match(/PluginBoutique|pluginboutique/gi) || []).length;
  console.log(f + ' | PluginBoutique mentions: ' + pbBtns);
});
