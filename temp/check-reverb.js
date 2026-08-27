var fs=require('fs');
var c=fs.readFileSync('guides/best-ribbon-mics.html','utf8');
var re=/reverb\.com[^"']*/g;
var m;
var seen={};
while(m=re.exec(c)){
  var u=decodeURIComponent(m[0]);
  if(!seen[u]){seen[u]=1; console.log(u)}
}
