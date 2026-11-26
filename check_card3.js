const fs = require('fs');
var r = fs.readFileSync('guides/best-interface.html','utf8');
var idx = r.indexOf('9.3</div><div style=');
var cardStart = r.lastIndexOf('<div class="guide-product-card', idx);
var cardHtml = r.substring(cardStart, cardStart+200).replace(/\n/g,' ');
fs.writeFileSync('/tmp/card3.txt', cardHtml);
console.log('written');