var fs = require('fs');
var h = fs.readFileSync('guides/best-shotgun-mics.html', 'utf8');

// Find product card with pid 358
var cardMarker = 'data-pid="358"';
var idx = h.indexOf(cardMarker);
if (idx === -1) {
  console.log('Card with data-pid=358 NOT FOUND');
} else {
  console.log('Card found at index', idx);
  // Extract surrounding context
  var start = Math.max(0, idx - 500);
  var end = Math.min(h.length, idx + 500);
  var chunk = h.substring(start, end);
  // Find the img tag
  var imgMatch = chunk.match(/<img[^>]*>/g);
  if (imgMatch) {
    imgMatch.forEach(function(m) {
      console.log('IMG:', m.substring(0, 200));
    });
  }
}

// Also check for AT875R text
var atIdx = h.indexOf('AT875R');
console.log('\nAT875R text found at:', atIdx);
if (atIdx !== -1) {
  // Find nearest img tag
  var before = h.substring(Math.max(0, atIdx - 1000), atIdx);
  var after = h.substring(atIdx, Math.min(h.length, atIdx + 1000));
  var imgsBefore = before.match(/<img[^>]*>/g);
  var imgsAfter = after.match(/<img[^>]*>/g);
  if (imgsBefore) console.log('IMG before:', imgsBefore[imgsBefore.length - 1].substring(0, 300));
  if (imgsAfter) console.log('IMG after:', imgsAfter[0].substring(0, 300));
}
