var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
['219.00','105.00','159.00','349.99','SENE906','AUDI5','SHUBETA57A','BEYM201TG'].forEach(function(s){
  var c=0, idx=0;
  while((idx=en.indexOf(s,idx))>-1){ c++; idx+=s.length; }
  console.log(s+': '+c+' hits');
});
// show e906 card button html
var i=en.indexOf('Sennheiser e906');
var card=en.indexOf('guide-product-card', Math.max(0,i-200));
console.log('--- e906 card region ---');
console.log(en.slice(en.indexOf('Sennheiser e906'), en.indexOf('Sennheiser e906')+1500).replace(/\n/g,' '));
