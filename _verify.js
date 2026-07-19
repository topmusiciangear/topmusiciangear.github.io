var g = require('./data/guides.json');
var bad = 0, empty = 0, over = 0;
g.forEach(function(guide){
  ['intro','intro_es'].forEach(function(f){
    var t = guide[f] || '';
    if (!t) { empty++; console.log('EMPTY: ' + guide.id + ' ' + f); }
    if (t && !t.match(/[.!?]$/)) { bad++; console.log('BAD END: ' + guide.id + ' ' + f); }
    if (t && t.length > 130) { over++; console.log('OVER 130: ' + guide.id + ' ' + f + ' len=' + t.length + ' ' + t.slice(0,60)); }
  });
});
console.log('Bad endings: ' + bad + ' Empty: ' + empty + ' Over 130: ' + over);
