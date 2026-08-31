var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var remaining = [];
g.forEach(guide=>{
  var allEN = [guide.intro, guide.conclusion, ...guide.sections.map(s=>s.content)].join(' ');
  ["I've used",'I use ','my desk','my room'].forEach(p=>{
    if(allEN.includes(p)) {
      var idx = allEN.indexOf(p);
      remaining.push(guide.id+': '+allEN.substring(Math.max(0,idx-20),idx+40));
    }
  });
});
remaining.forEach(r=>console.log(r));
console.log('Total: '+remaining.length);
