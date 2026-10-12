var fs=require('fs');
var t=fs.readFileSync('temp/hub_move.js','utf8');
var lineStarts=[0];
for(var i=0;i<t.length;i++) if(t[i]==='\n') lineStarts.push(i+1);
function lineOf(pos){ var l=0; for(var k=0;k<lineStarts.length;k++){ if(lineStarts[k]<=pos) l=k+1; else break; } return l; }
[8005,8013,8035,8049,8601,8617].forEach(function(p){
  console.log('pos '+p+' => line '+lineOf(p)+': '+JSON.stringify(t.slice(p-60,p+60)));
});
