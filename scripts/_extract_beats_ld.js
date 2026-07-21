var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');
var m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
if (m) {
  console.log('Found ' + m.length + ' JSON-LD blocks');
  m.forEach(function(block, i) {
    var json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      var data = JSON.parse(json);
      if (data['@graph']) {
        console.log('Block ' + (i+1) + ' (@graph with ' + data['@graph'].length + ' items)');
        data['@graph'].forEach(function(item, j) {
          if (item['@type'] === 'Product') {
            console.log('  Product ' + (j+1) + ': ' + item.name + ' (sku: ' + (item.sku || 'N/A') + ', mpn: ' + (item.mpn || 'N/A') + ')');
          }
        });
      } else if (data['@type'] === 'ItemList') {
        console.log('Block ' + (i+1) + ' (ItemList with ' + (data.itemListElement ? data.itemListElement.length : '?') + ' items)');
      } else {
        console.log('Block ' + (i+1) + ' (@type: ' + data['@type'] + ')');
      }
    } catch(e) {
      console.log('Block ' + (i+1) + ': parse error');
    }
  });
}
