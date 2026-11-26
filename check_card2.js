const fs = require('fs');
var r = fs.readFileSync('guides/best-interface.html','utf8');
// Find the product card for MOTU M2
var idx = r.indexOf('MOTU M2</h3>');
var cardStart = r.lastIndexOf('<div class="guide-product-card', idx);
var cardHtml = r.substring(cardStart, cardStart+800).replace(/\n/g,' ');
fs.writeFileSync('/tmp/card2.txt', cardHtml);
console.log('written, length:', cardHtml.length);