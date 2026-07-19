var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var count = 0;

g.forEach(function(guide){
  ['intro','intro_es'].forEach(function(f){
    var t = guide[f];
    if (!t) return;
    // Remove trailing ...
    t = t.replace(/\.\.\.$/g, '').trim();
    // If doesn't end with sentence punctuation
    if (t && !t.match(/[.!?]$/)) {
      // Find last . ! ? in the text
      var last = -1;
      for (var i = t.length - 1; i >= 0; i--) {
        if ('.!?'.indexOf(t[i]) >= 0) { last = i; break; }
      }
      if (last > 0) {
        // Truncate at last complete sentence
        t = t.slice(0, last + 1).trim();
      } else {
        // No sentence punctuation found at all — just add period
        t = t + '.';
      }
    }
    // For multi-sentence intros > 130 chars, drop overflowing sentences
    if (t && t.length > 130) {
      var parts = t.match(/[^.!?]*[.!?]/g);
      if (parts && parts.length > 1) {
        var keep = '';
        for (var i = 0; i < parts.length; i++) {
          var s = parts[i].trim();
          var candidate = keep ? keep + ' ' + s : s;
          if (candidate.length <= 130) {
            keep = candidate;
          } else {
            break;
          }
        }
        if (keep) t = keep;
      }
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
