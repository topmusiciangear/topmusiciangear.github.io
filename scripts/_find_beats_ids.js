var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');

// Find all store links to map products
var links = html.match(/<a href="[^"]*"[^>]*class="chip-store"[^>]*>/g);
if (links) {
  console.log('Store links found: ' + links.length);
  links.forEach(function(l, i) {
    console.log((i+1) + ': ' + l.substring(0, 120));
  });
}
