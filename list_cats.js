var fs = require('fs');
var c = fs.readFileSync('index.html', 'utf8');
var matches = c.match(/<div class="cat-card"[^>]*>/g);
if (matches) {
  console.log('Found ' + matches.length + ' cat-cards');
  matches.forEach(function(x, i) {
    console.log((i+1) + '. ' + x.substring(0, 120));
  });
} else {
  console.log('No cat-cards found');
}