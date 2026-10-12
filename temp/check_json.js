var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
console.log('JSON titleTag: ['+g.titleTag+']');
console.log('JSON title: ['+g.title+']');
