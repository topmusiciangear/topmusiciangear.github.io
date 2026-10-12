var fs = require('fs');
var s = fs.readFileSync('guides/best-microphone.html', 'utf8');
console.log('shop-wm count:', s.split('shop-wm').length - 1);
console.log('hover rule:', s.indexOf('.shop-more-list a:hover .shop-wm{color:#FFC107}') >= 0);
var i = s.indexOf('white-space:nowrap;flex-shrink:0;');
console.log('ROW:', JSON.stringify(s.slice(i, i + 130)));
var sb = fs.readFileSync('js/shop-buttons.js', 'utf8');
console.log('SPA shop-wm:', sb.split('shop-wm').length - 1);
