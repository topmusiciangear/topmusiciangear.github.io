var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var count = 0;

g.forEach(function(guide){
  ['intro','intro_es'].forEach(function(f){
    var t = guide[f];
    if (!t) return;
    // 1. Remove trailing ...
    t = t.replace(/\.\.\.$/g, '').trim();
    // 2. If now ends without sentence punctuation, truncate to last complete sentence
    if (t && !t.match(/[.!?]$/)) {
      var lastPunct = -1;
      for (var pi = t.length - 1; pi >= 0; pi--) {
        if ('.!?'.indexOf(t[pi]) >= 0) { lastPunct = pi; break; }
      }
      if (lastPunct > 0) {
        t = t.slice(0, lastPunct + 1);
      }
    }
    // 3. For multi-sentence intros > 130 chars, drop sentences that exceed the limit
    var maxLen = 130;
    if (t && t.length > maxLen) {
      // Split into sentences
      var parts = t.match(/[^.!?]*[.!?]/g);
      if (parts && parts.length > 1) {
        var keep = '';
        for (var i = 0; i < parts.length; i++) {
          var s = parts[i].trim();
          var candidate = keep ? keep + ' ' + s : s;
          if (candidate.length <= maxLen) {
            keep = candidate;
          } else {
            break;
          }
        }
        if (keep) {
          t = keep;
        }
        // else keep original (single sentence too long)
      }
      // else keep single long sentence as-is (can't break at sentence boundary)
    }
    t = t.trim();
    if (t !== guide[f]) {
      guide[f] = t;
      count++;
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2));
console.log('Fixed ' + count + ' intros');
