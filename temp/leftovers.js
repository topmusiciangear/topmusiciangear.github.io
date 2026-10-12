var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
d.forEach(function(g){
  var s=JSON.stringify(g);
  var idx=0;
  while((idx=s.indexOf('midi-keyboards',idx))>-1){
    console.log(g.id+' :: '+JSON.stringify(s.slice(Math.max(0,idx-150),idx+100)));
    idx+=14;
  }
});
