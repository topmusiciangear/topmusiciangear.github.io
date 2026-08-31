var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var enTrunc=0, esTrunc=0, bothTrunc=0;
g.forEach(guide=>{
  guide.sections.forEach((s,j)=>{
    if(s.content && s.content.length > 50) {
      var enLast = s.content.trim().slice(-1);
      var esLast = s.content_es ? s.content_es.trim().slice(-1) : '';
      var enClean = /[.!?'")\]>]/.test(enLast);
      var esClean = /[.!?'")\]>]/.test(esLast);
      if(!enClean) enTrunc++;
      if(!esClean) esTrunc++;
      if(!enClean && !esClean) bothTrunc++;
    }
  });
});
console.log('EN truncated: '+enTrunc);
console.log('ES truncated: '+esTrunc);
console.log('Both truncated: '+bothTrunc);
console.log('ES-only truncated: '+(esTrunc-bothTrunc));
