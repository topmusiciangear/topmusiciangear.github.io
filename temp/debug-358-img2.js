var fs = require('fs');
var h = fs.readFileSync('guides/best-shotgun-mics.html', 'utf8');

// Find the product card for AT875R (look for the card wrapper with the product name)
var searchStr = 'AT875R';
var positions = [];
var pos = 0;
while ((pos = h.indexOf(searchStr, pos)) !== -1) {
  positions.push(pos);
  pos += searchStr.length;
}
console.log('AT875R found at positions:', positions);

// For each position, show the surrounding img tag if any
positions.forEach(function(p, i) {
  var chunk = h.substring(Math.max(0, p - 500), Math.min(h.length, p + 500));
  var imgMatch = chunk.match(/<img[^>]*>/g);
  if (imgMatch) {
    imgMatch.forEach(function(m) {
      var srcMatch = m.match(/src="([^"]+)"/);
      console.log('Position ' + i + ' img:', srcMatch ? srcMatch[1].substring(0, 100) : 'no src');
    });
  }
});

// Also check: what's the image in the product card (look for guide-product-card-img class near AT875R)
var cardImgIdx = h.indexOf('guide-product-card-img');
while (cardImgIdx !== -1) {
  var nearby = h.substring(cardImgIdx, cardImgIdx + 500);
  if (nearby.indexOf('AT875R') !== -1 || nearby.indexOf('875r') !== -1) {
    console.log('\nProduct card img area:', nearby.substring(0, 300));
    break;
  }
  cardImgIdx = h.indexOf('guide-product-card-img', cardImgIdx + 1);
}
