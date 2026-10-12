var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
var T='13 Best Budget USB Mics Under $110 (Pros, Cons & Buying Guide 2026)';
g.title=T; g.titleTag=T;
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('fixed: ['+g.titleTag+']');
