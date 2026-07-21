var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');

// Find product card titles
var titles = html.match(/<div class="guide-product-card-title">([^<]+)<\/div>/g);
if (titles) {
  console.log('Product titles:');
  titles.forEach(function(t) {
    var mt = t.match(/<div class="guide-product-card-title">([^<]+)<\/div>/);
    if (mt) console.log('  - ' + mt[1]);
  });
}

// Find product prices
var prices = html.match(/<div class="guide-product-card-price">\$[^<]+<\/div>/g);
if (prices) {
  console.log('\nProduct prices:');
  prices.forEach(function(p) {
    var mp = p.match(/<div class="guide-product-card-price">([^<]+)<\/div>/);
    if (mp) console.log('  - ' + mp[1]);
  });
}

// Find descriptions
var descs = html.match(/<div class="guide-product-card-desc"[^>]*>([\s\S]*?)<\/div>\s*<div class="guide-product-card-desc-toggle"/g);
if (descs) {
  console.log('\nFound ' + descs.length + ' descriptions');
}

// Find section headings
var sectionHeadings = html.match(/<h2 class="guide-section-heading">([^<]+)<\/h2>/g);
if (sectionHeadings) {
  console.log('\nSection headings:');
  sectionHeadings.forEach(function(h) {
    var mh = h.match(/<h2 class="guide-section-heading">([^<]+)<\/h2>/);
    if (mh) console.log('  - ' + mh[1]);
  });
}

// Find intro
var intro = html.match(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/);
if (intro) {
  console.log('\nIntro: ' + intro[1].replace(/<[^>]+>/g, '').substring(0, 200));
}
