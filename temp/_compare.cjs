var fs = require('fs');
var t = fs.readFileSync('guides/best-bass-amps.html', 'utf8');
var n = fs.readFileSync('guides/best-bass-practice-amps.html', 'utf8');
function probe(h, label) {
  console.log('--- ' + label + ' ---');
  console.log('has catalog price of primary ($499.99 / $269.99): ' + (h.indexOf('$499.99') >= 0 || h.indexOf('$269.99') >= 0));
  console.log('has app.min.js: ' + (h.indexOf('app.min.js') >= 0));
  console.log('has shop-buttons.js: ' + (h.indexOf('shop-buttons.js') >= 0));
  console.log('has JSON-LD application/ld+json: ' + (h.indexOf('application/ld+json') >= 0));
  console.log('product card class: ' + ((h.match(/class="[^"]*product-card[^"]*"/g) || []).slice(0, 1).join('') || 'none'));
  console.log('data-store markers: ' + ((h.match(/data-store="[a-z0-9-]+"/g) || []).slice(0, 3).join(' ')));
  console.log('geo swap fn inline (tmgGeoSwap/gText): ' + (h.indexOf('tmgGeoSwap') >= 0 || h.indexOf('gText') >= 0));
  var m = h.match(/Compare [0-9]+ (more )?stores/g);
  console.log('counter: ' + (m || []).slice(0, 1));
}
probe(t, 'TEMPLATE best-bass-amps');
probe(n, 'NEW best-bass-practice-amps');