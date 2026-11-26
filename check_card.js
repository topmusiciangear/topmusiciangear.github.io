const fs = require('fs');
var r = fs.readFileSync('guides/best-interface.html','utf8');
var idx = r.indexOf('Focusrite Scarlett 2i2 4th Gen</h3>');
var cardStart = r.lastIndexOf('<div class="guide-product-card', idx);
var cardHtml = r.substring(cardStart, cardStart+500).replace(/\n/g,' ');
fs.writeFileSync('/tmp/card.txt', cardHtml);
console.log('written, length:', cardHtml.length);