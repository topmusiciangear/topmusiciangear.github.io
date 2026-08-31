var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var ids = ['best-headphones','budget-mics','open-headphones','tracking-headphones','mixing-plugins','fx-plugins','tube-ribbon-mics','vocal-plugins','sm57-vs-sm58','scarlett-vs-ssl','best-samplers-drum-computers','ts9-vs-bd2','beat-making'];

ids.forEach(id=>{
  var guide = g.find(x=>x.id===id);
  if(!guide) return;
  guide.sections.forEach((s,j)=>{
    if(s.content) {
      var patterns = ['I use ', "I've used", 'my desk', 'my room'];
      patterns.forEach(p=>{
        if(s.content.includes(p)) {
          var idx = s.content.indexOf(p);
          console.log(id+' S'+j+': ...'+s.content.substring(Math.max(0,idx-30), idx+40)+'...');
        }
      });
    }
  });
});
