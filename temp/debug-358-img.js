var fs = require('fs');
var h = fs.readFileSync('guides/best-shotgun-mics.html', 'utf8');

// Find all src= containing "audio-technica" or "at875r"
var matches = h.match(/src="[^"]*(?:audio-technica|at875r)[^"]*"/gi);
console.log('AT image src matches:', matches);

// Find the product card section - look for AT875R near a product card
var idx = h.indexOf('AT875R');
if (idx !== -1) {
  // Find the nearest img tag before and after
  var before = h.substring(Math.max(0, idx - 2000), idx);
  var after = h.substring(idx, Math.min(h.length, idx + 2000));
  
  var imgsBefore = before.match(/<img[^>]*src="([^"]+)"[^>]*>/g);
  var imgsAfter = after.match(/<img[^>]*src="([^"]+)"[^>]*>/g);
  
  if (imgsBefore) {
    var last = imgsBefore[imgsBefore.length - 1];
    console.log('\nNearest img BEFORE AT875R:', last.substring(0, 300));
  }
  if (imgsAfter) {
    var first = imgsAfter[0];
    console.log('\nNearest img AFTER AT875R:', first.substring(0, 300));
  }
}

// Check the specific product card area - look for the section with AT875R
var sectionIdx = h.indexOf('AT875R Short Shotgun');
if (sectionIdx !== -1) {
  var chunk = h.substring(sectionIdx, sectionIdx + 3000);
  var imgInChunk = chunk.match(/<img[^>]*src="([^"]+)"[^>]*>/g);
  if (imgInChunk) {
    imgInChunk.forEach(function(m, i) {
      console.log('Img in AT875R section #' + i + ':', m.substring(0, 200));
    });
  }
}
