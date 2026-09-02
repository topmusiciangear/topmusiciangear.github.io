var fs = require('fs');
var h = fs.readFileSync('guides/sidechain-modulation-plugins_es.html', 'utf8');

// Check for key elements
var checks = [
  ['guide-detail-img', 'Cover image container'],
  ['guide-product-card', 'Product cards'],
  ['shop-btn-primary', 'Shop buttons'],
  ['guide-section-heading', 'Section headings'],
  ['verdict', 'Verdict section'],
  ['guide-detail-intro', 'Intro section'],
  ['guide-author-box', 'Author box'],
];

checks.forEach(function(c) {
  var count = (h.match(new RegExp(c[0], 'g')) || []).length;
  console.log(c[1] + ': ' + count + ' occurrences');
});

// Check for prices
var prices = h.match(/\$[\d,.]+|£[\d,.]+|€[\d,.]+/g);
console.log('\nPrices found:', prices ? prices.length : 0);
if (prices) {
  var unique = prices.filter(function(v, i, a) { return a.indexOf(v) === i; });
  console.log('Unique prices:', unique.join(', '));
}

// Check for image sources
var imgSrcs = h.match(/src="[^"]*"/g);
var productImgs = imgSrcs ? imgSrcs.filter(function(s) { return s.indexOf('pluginboutique') >= 0 || s.indexOf('gear4music') >= 0; }) : [];
console.log('\nProduct/store images:', productImgs.length);
