var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
console.log('in guides.json: grooveboxes='+d.some(function(g){return g.id==='best-grooveboxes'})+' tube-ribbon='+d.some(function(g){return g.id==='tube-ribbon-mics'}));
console.log('total guides: '+d.length+' (x2 langs = '+(d.length*2)+', generated 312)');
