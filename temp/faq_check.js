var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-mic-for-guitar-amps'});
var fsn=g.featuredSnippet||{};
Object.keys(fsn).filter(function(k){return /faq/i.test(k)}).forEach(function(k){
  console.log('--- '+k+' ---\n'+fsn[k]+'\n');
});
// buscar la misma pregunta en otras guias
var q='ribbon microphone on a guitar amp';
var dupes=d.filter(function(x){return JSON.stringify(x.featuredSnippet||{}).indexOf(q)>-1}).map(function(x){return x.id});
console.log('GUIDES WITH SAME RIBBON Q: '+dupes.join(', '));
