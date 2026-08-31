var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixed = 0;

g.forEach(guide=>{
  guide.sections.forEach((s,i)=>{
    ['content','content_es'].forEach(f=>{
      if(!s[f]) return;
      
      // Fix "you...need...buy" patterns
      var re = /you([\s\S]{0,30})need([\s\S]{0,30})buy/gi;
      if(re.test(s[f])) {
        guide.sections[i][f] = s[f].replace(re, function(match, p1, p2) {
          return 'consider' + p1.trim() + ' buying';
        });
        fixed++;
        console.log(guide.id+' sec'+i+' '+f+': Fixed need...buy');
      }
      
      // Fix "you...should...buy" patterns
      var re2 = /you([\s\S]{0,30})should([\s\S]{0,30})buy/gi;
      if(re2.test(guide.sections[i][f])) {
        guide.sections[i][f] = guide.sections[i][f].replace(re2, function(match, p1, p2) {
          return 'consider' + p1.trim() + ' buying';
        });
        fixed++;
        console.log(guide.id+' sec'+i+' '+f+': Fixed should...buy');
      }
    });
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Total fixes: '+fixed);
