var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var check = ['vocal-plugins','ts9-vs-bd2','scarlett-vs-ssl','open-headphones'];
check.forEach(id=>{
  var guide = g.find(x=>x.id===id);
  ['intro','conclusion','intro_es','conclusion_es'].forEach(f=>{
    if(guide[f] && (guide[f].includes('my desk') || guide[f].includes('my room') || guide[f].includes("I use ") || guide[f].includes("I've used"))) {
      console.log(id+'.'+f+': contains personal ref');
    }
  });
  guide.sections.forEach((s,j)=>{
    ['content','content_es'].forEach(f=>{
      if(s[f] && (s[f].includes('my desk') || s[f].includes('my room') || s[f].includes("I use ") || s[f].includes("I've used"))) {
        var idx = s[f].indexOf('my desk') !== -1 ? s[f].indexOf('my desk') : 
                  s[f].indexOf('my room') !== -1 ? s[f].indexOf('my room') :
                  s[f].indexOf("I use ") !== -1 ? s[f].indexOf("I use ") : s[f].indexOf("I've used");
        console.log(id+' S'+j+'.'+f+': ...'+s[f].substring(Math.max(0,idx-20),idx+40)+'...');
      }
    });
  });
});
