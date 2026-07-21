var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');
var ids = [];
var re = /data-product-id="(\d+)"/g;
var m;
while ((m = re.exec(html)) !== null) {
  if (ids.indexOf(m[1]) === -1) ids.push(m[1]);
}
console.log('Product IDs found: ' + ids.join(', '));

var titleMatch = html.match(/<title>(.*?)<\/title>/);
console.log('Title: ' + (titleMatch ? titleMatch[1] : 'N/A'));

var descMatch = html.match(/<meta name="description" content="(.*?)">/);
console.log('Desc: ' + (descMatch ? descMatch[1] : 'N/A'));

var imgMatch = html.match(/<meta property="og:image" content="(.*?)">/);
console.log('Image: ' + (imgMatch ? imgMatch[1] : 'N/A'));

var dateMatch = html.match(/article:published_time" content="(.*?)">/);
console.log('Published: ' + (dateMatch ? dateMatch[1] : 'N/A'));

// Extract hero section info
var heroMatch = html.match(/guide-detail-intro">(.*?)<\/p>/);
console.log('Intro: ' + (heroMatch ? heroMatch[1].substring(0, 150) : 'N/A'));

// Check for category/badge
var catMatch = html.match(/class="guide-badge">(.*?)<\/span>/);
console.log('Badge: ' + (catMatch ? catMatch[1] : 'N/A'));
