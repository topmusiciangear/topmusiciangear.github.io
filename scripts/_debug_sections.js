var fs = require('fs');
var html = fs.readFileSync('guides/beat-making.html', 'utf8');

// Split by guide-section
var blocks = html.split('<div class="guide-section">');
console.log('Number of blocks: ' + blocks.length);

blocks.forEach(function(b, i) {
  if (i === 0) return; // skip before first
  var h = b.match(/<h2 class="guide-section-heading">([^<]+)<\/h2>/);
  console.log('Block ' + i + ' heading: ' + (h ? h[1].substring(0, 60) : 'NOT FOUND'));
  
  // Try different content extraction patterns
  var p1 = b.match(/<div class="guide-section-content">([\s\S]*?)<\/div>\s*</);
  console.log('  Pattern 1 (content): ' + (p1 ? (p1[1].substring(0, 80) + '...') : 'NO MATCH'));
  
  // Show what comes after content div
  var afterContent = b.split('<div class="guide-section-content">');
  if (afterContent.length > 1) {
    var rest = afterContent[1];
    var endDiv = rest.indexOf('</div>');
    if (endDiv > 0) {
      var afterClose = rest.substring(endDiv + 6, endDiv + 100);
      console.log('  After content close: ' + afterClose.substring(0, 60));
    }
  }
  console.log('');
});
