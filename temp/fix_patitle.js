var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-pa-speakers';});
console.log('before: '+JSON.stringify(g.titleTag));
g.titleTag='Best 12" & 15" Powered PA Speakers';
console.log('after: '+JSON.stringify(g.titleTag));
fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('DONE');