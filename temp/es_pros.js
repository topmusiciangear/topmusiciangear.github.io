var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
var vpc=g.verdictProsCons;
console.log(JSON.stringify(vpc,null,1).slice(0,1500));
// check ES words for pros/cons headings in build
