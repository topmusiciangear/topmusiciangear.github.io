var fs=require('fs');
var t=fs.readFileSync('temp/hub_move.js','utf8');
var suspects={'`':0,'$':0};
for(var i=0;i<t.length;i++){
  var c=t[i];
  if(c==='`') suspects['`']++;
  if(c==='$'&&t[i+1]==='{') suspects['$']++;
}
console.log(JSON.stringify(suspects));
// print char codes of line 43 between 'arpeggiator' and 'USB-C'
var L=t.split('\n');
var l43=L[42];
var a=l43.indexOf('arpeggiator');
console.log(JSON.stringify(l43.slice(a-10,a+120)));
