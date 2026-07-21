var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

var pbLinks = {
  28: 'https://www.pluginboutique.com/product/2-Instruments/4-Player/14977-Kontakt-8-Player?a_aid=6a01e859cbe1a',
  29: 'https://www.pluginboutique.com/search?q=FabFilter+Total+Bundle&a_aid=6a01e859cbe1a',
  30: 'https://www.pluginboutique.com/product/2-Instruments/11-Producer-Bundle/14667-Ozone-12-Advanced?a_aid=6a01e859cbe1a',
  32: 'https://www.pluginboutique.com/product/2-Effects/13-Effects-Bundle/3784-Effect-Rack-Bundle-5-5?a_aid=6a01e859cbe1a',
  60: 'https://www.pluginboutique.com/search?q=UA+1176+Classic+Limiter+Collection&a_aid=6a01e859cbe1a',
  61: 'https://www.pluginboutique.com/search?q=TDR+Kotelnikov+GE&a_aid=6a01e859cbe1a',
  62: 'https://www.pluginboutique.com/product/2-Effects/4-EQ/15433-FabFilter-Pro-Q-4?a_aid=6a01e859cbe1a',
  63: 'https://www.pluginboutique.com/product/2-Effects/3-Compressor/7930-FabFilter-Pro-C-2?a_aid=6a01e859cbe1a',
  110: 'https://www.pluginboutique.com/search?q=Ableton+Live+12+Suite&a_aid=6a01e859cbe1a',
  118: 'https://www.pluginboutique.com/search?q=Waves+Mercury+Bundle&a_aid=6a01e859cbe1a',
  119: 'https://www.pluginboutique.com/search?q=Waves+SSL+G-Master+Buss+Compressor&a_aid=6a01e859cbe1a',
  120: 'https://www.pluginboutique.com/search?q=Celemony+Melodyne+5&a_aid=6a01e859cbe1a',
  121: 'https://www.pluginboutique.com/search?q=Universal+Audio+UAD+Ultimate+14&a_aid=6a01e859cbe1a',
  122: 'https://www.pluginboutique.com/search?q=iZotope+RX+11+Advanced&a_aid=6a01e859cbe1a',
  123: 'https://www.pluginboutique.com/search?q=Native+Instruments+Komplete+26+Ultimate&a_aid=6a01e859cbe1a'
};

var count = 0;
p.forEach(function(pr) {
  if (pbLinks[pr.id] && pr.affiliate) {
    pr.affiliate.pluginboutique = pbLinks[pr.id];
    count++;
    console.log('Added PluginBoutique to: ' + pr.title);
  }
});

fs.writeFileSync('data/products.json', JSON.stringify(p, null, 2), 'utf8');
console.log('Done. Updated ' + count + ' products.');
