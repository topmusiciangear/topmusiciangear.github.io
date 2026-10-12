var fs = require('fs');
var s = fs.readFileSync('guides/fender-bass-guide.html', 'utf8');
// find the visible H2/H3 product title (not JSON-LD): look for h2/h3 containing 'Precision Bass'
var re = /<h[23][^>]*>[^<]*Precision Bass[^<]*<\/h[23]>/g, m;
while ((m = re.exec(s))) console.log(JSON.stringify(m[0].slice(0, 300)));
