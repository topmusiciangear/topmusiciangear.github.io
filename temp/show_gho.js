var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-guitar-home-office'});
console.log('title: '+g.title);
console.log('titleTag: '+g.titleTag);
console.log('title_es: '+g.title_es);
console.log('titleTag_es: '+g.titleTag_es);
