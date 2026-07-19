var lines = require('fs').readFileSync('data/guides.json','utf8').split('\n');
lines.forEach(function(l,i){
  if(l.indexOf('"products": [29') > -1 || l.indexOf('"products": [29,') > -1 || l.indexOf('"products": [29,30') > -1) {
    console.log((i+1)+': '+l.trim());
  }
});
