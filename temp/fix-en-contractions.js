var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixes = 0;

function fixEnContractions(text){
  if(!text || typeof text !== 'string') return text;
  var result = text;
  result = result.replace(/\barent\b/g, "aren't");
  result = result.replace(/\bcant\b/g, "can't");
  result = result.replace(/\bdoesnt\b/g, "doesn't");
  result = result.replace(/\bdont\b/g, "don't");
  result = result.replace(/\bwont\b/g, "won't");
  result = result.replace(/\bisnt\b/g, "isn't");
  result = result.replace(/\bdidnt\b/g, "didn't");
  result = result.replace(/\bshouldnt\b/g, "shouldn't");
  result = result.replace(/\bwouldnt\b/g, "wouldn't");
  result = result.replace(/\bcouldnt\b/g, "couldn't");
  result = result.replace(/\bhasnt\b/g, "hasn't");
  result = result.replace(/\bhavent\b/g, "haven't");
  result = result.replace(/\bwerent\b/g, "weren't");
  result = result.replace(/\bwasnt\b/g, "wasn't");
  result = result.replace(/\bthats\b/g, "that's");
  result = result.replace(/\bitsnt\b/g, "it's");
  return result;
}

g.forEach(function(guide){
  ['title','description','verdict','intro','conclusion'].forEach(function(f){
    var orig = guide[f];
    guide[f] = fixEnContractions(orig);
    if(guide[f] !== orig) fixes++;
  });
  if(guide.featuredSnippet){
    Object.keys(guide.featuredSnippet).forEach(function(k){
      if(k.indexOf('_es') === -1){
        var orig = guide.featuredSnippet[k];
        guide.featuredSnippet[k] = fixEnContractions(orig);
        if(guide.featuredSnippet[k] !== orig) fixes++;
      }
    });
  }
  (guide.sections||[]).forEach(function(s){
    ['heading','content'].forEach(function(f){
      var orig = s[f];
      s[f] = fixEnContractions(orig);
      if(s[f] !== orig) fixes++;
    });
  });
});

console.log('Fixed ' + fixes + ' EN contractions');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
