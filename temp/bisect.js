var fs=require('fs');
var vm=require('vm');
var lines=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
// test cumulative prefixes: find first failing line count
var lo=1, hi=lines.length, firstFail=-1;
while(lo<=hi){
  var mid=Math.floor((lo+hi)/2);
  var src=lines.slice(0,mid).join('\n');
  var ok=true;
  try{ new vm.Script(src); }catch(e){ ok=false; }
  if(ok){ lo=mid+1; } else { firstFail=mid; hi=mid-1; }
}
console.log('first failing prefix ends at line: '+firstFail);
if(firstFail>0){
  console.log('--- lines '+(firstFail-3)+'..'+firstFail+' ---');
  for(var i=Math.max(0,firstFail-4);i<firstFail;i++) console.log((i+1)+': '+lines[i].slice(0,200));
}
