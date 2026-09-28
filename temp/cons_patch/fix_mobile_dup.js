var fs=require('fs');
var f1='js/shop-buttons.js';
var f2='temp/gen-shop-buttons.js';
[f1,f2].forEach(function(f){
  var s=fs.readFileSync(f,'utf8');
  // In doSwap, before re-inserting displaced primary, remove any existing row for curStore
  var old = 'if (ml2 && !ml2.querySelector(\'[data-store="\' + curStore + \'"]\')) {';
  var neu = 'if (ml2) { var existing = ml2.querySelector(\'[data-store="\' + curStore + \'"]\'); if (existing) existing.remove(); if (!ml2.querySelector(\'[data-store="\' + curStore + \'"]\')) {';
  if(s.includes(old)){
    s = s.replace(old, neu);
    fs.writeFileSync(f, s, 'utf8');
    console.log(f+' patched');
  }else{
    console.log(f+' pattern not found, checking alternative...');
    // Try alternative pattern
    var alt = 'if (ml2 && !ml2.querySelector(\'[data-store="\'+curStore+\'"]\')) {';
    if(s.includes(alt)){
      s = s.replace(alt, neu);
      fs.writeFileSync(f, s, 'utf8');
      console.log(f+' patched (alt)');
    }else{
      console.log(f+' no match found');
    }
  }
});