var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
console.log('=== featuredProducts ===');
console.log(JSON.stringify(g.featuredProducts));
console.log('=== sections (headings+products) ===');
g.sections.forEach(function(s,i){console.log(i+': '+s.heading+' | products: '+(s.products||[]).join(','));});
