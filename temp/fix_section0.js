var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';

var d=JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='streaming-interfaces';});

// Fix section 0 products - should include all 5 main streaming interfaces
g.sections[0].products=[239,240,262,328,664]; // Rodecaster Duo, Bridge Cast X, EVO 4, Volt 276, Zoom P4next

// Also fix Volt 276 section products (should have 263 and 328? No, Volt is 263, and 328 is MiniFuse which we removed)
var voltSec=g.sections.find(function(s){return s.products && s.products.includes(263);});
if(voltSec){
  voltSec.products=[263]; // Just Volt 276
}

// Fix EVO 4 section products
var evoSec=g.sections.find(function(s){return s.products && s.products.includes(262);});
if(evoSec){
  evoSec.products=[262]; // Just EVO 4
}

fs.writeFileSync(BASE+'data/guides.json',JSON.stringify(d,null,2));
console.log('Section 0 products:',g.sections[0].products);
console.log('Volt section products:',voltSec.products);
console.log('EVO section products:',evoSec.products);
console.log('DONE');