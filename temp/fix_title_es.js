var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
var T='Los 13 mejores micrófonos USB económicos por menos de $110 (pros, contras y guía de compra 2026)';
g.title_es=T; g.titleTag_es=T;
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('ES fixed: ['+g.titleTag_es+']');
console.log('EN still: ['+g.titleTag+']');
