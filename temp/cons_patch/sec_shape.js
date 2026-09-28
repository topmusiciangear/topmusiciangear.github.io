var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var l=Array.isArray(d)?d:d.guides;
var p=l.filter(function(x){return x.id==='premium-interfaces';})[0];
var o=l.filter(function(x){return x.id==='portable-interfaces';})[0];
function secShape(g){var s=g.sections||[];return s.map(function(x){
  var k=Object.keys(x);var hasTitle=x.title!==undefined;var titleT=typeof x.title;
  var t=x.title;if(typeof t==='object'&&t)t=JSON.stringify(t).slice(0,40);
  return {keys:k.slice(0,7).join(','),titleType:titleT,titleVal:(hasTitle?String(t).slice(0,45):'NONE')};
});}
console.log('PORTABLE sectionsN='+(o.sections?o.sections.length:0));
secShape(o).slice(0,2).forEach(function(s,i){console.log('  P['+i+'] keys='+s.keys+' title='+s.titleVal);});
console.log('PREMIUM sectionsN='+(p.sections?p.sections.length:0));
secShape(p).forEach(function(s,i){console.log('  M['+i+'] keys='+s.keys+' titleType='+s.titleType+' title='+s.titleVal);});
console.log('PREMIUM otros keys sections: '+(p.sections?"(obra en array de "+p.sections.length+")":'NO ARRAY')+' | featuredSections='+(p.featuredSections?p.featuredSections.length:0));
