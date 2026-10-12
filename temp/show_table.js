var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
console.log('KEYS productTable: '+Object.keys(g.productTable||{}).join(', '));
console.log(JSON.stringify(g.productTable,null,1).slice(0,12000));
