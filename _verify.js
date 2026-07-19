var g = require('./data/guides.json');
var bad = 0, empty = 0, over = 0;
g.forEach(function(guide){
  ['intro','intro_es'].forEach(function(f){
    var t = guide[f] || '';
    if (!t) { empty++; }
    if (t && !t.match(/[.!?]$/)) { bad++; console.log('BAD END: ' + guide.id + ' ' + f); }
    if (t && t.length > 130) { over++; }
  });
});
console.log('Bad endings: ' + bad + ' Empty: ' + empty + ' Over 130: ' + over);
