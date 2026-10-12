var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
var cols=g.productTable.columns.map(function(c){return c.title});
var hp=g.productTable.rows.find(function(r){return r.label==='Headphone Monitoring'});
var fr=g.productTable.rows.find(function(r){return r.label==='Frequency Response'});
var bit=g.productTable.rows.find(function(r){return r.label==='Bit Depth / Sample Rate'});
['Razer Seiren V3','HyperX SoloCast 2','HyperX SoloCast','Maono PM461 USB','FIFINE AmpliTank K688'].forEach(function(name){
  var i=cols.indexOf(name);
  console.log(name+' | HP:'+hp.values[i].value+' | Freq:'+fr.values[i].value+' | Bit:'+bit.values[i].value);
});
