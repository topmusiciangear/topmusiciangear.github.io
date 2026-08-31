var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var realIssues = 0;
var truncated = [];
g.forEach(guide=>{
  guide.sections.forEach((s,j)=>{
    if(s.content_es && s.content_es.length > 50) {
      var last = s.content_es.trim().slice(-1);
      var endsClean = /[.!?'">)]/.test(last);
      if(!endsClean) {
        var last80 = s.content_es.substring(s.content_es.length-80);
        if(last80.indexOf('</a>') === -1 && last80.indexOf('</p>') === -1) {
          realIssues++;
          truncated.push({id: guide.id, section: j, end: last80});
        }
      }
    }
  });
});
truncated.slice(0,20).forEach(t=>console.log(t.id+' S'+t.section+': ...'+t.end+'...'));
console.log('\nReal truncated sections: '+realIssues);
