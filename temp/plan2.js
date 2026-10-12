var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
var i=src.indexOf('function productCard');
console.log(src.slice(i,i+1500));
// TEST_SHOP_BTN 211?
var j=src.indexOf('TEST_SHOP_BTN');
var mapStart=src.indexOf('{',j);
var k211=src.indexOf('211:',j);
console.log('--- 211 entry near: '+src.slice(k211,k211+600));
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var withReverb=ps.filter(function(p){return p.stores&&p.stores.reverb});
console.log('REVERB COUNT: '+withReverb.length);
console.log('REVERB EX: '+withReverb[0].stores.reverb);
var noRating=ps.filter(function(p){return p.rating===undefined||p.rating===null});
console.log('NO-RATING COUNT: '+noRating.length+(noRating[0]?(' EX: '+noRating[0].id+' '+noRating[0].title):''));
